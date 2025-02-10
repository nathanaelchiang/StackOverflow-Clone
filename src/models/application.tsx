import Question from "./question";
import Tag from "./tag";
import Answer from "./answer";
import { ApplicationInterface, ApplicationProps, QuestionsFilterType } from "../types/types";

/**
 * The class encapsulates the application data
 * and operations to manipulate the data (model layer).
 * The class is a singleton class.
 * All data is stored only in memory for this prototype.
 * @implements ApplicationInterface
 */
export default class Application implements ApplicationInterface {
  private static instance: Application;

  /**
   * An in-memory list of all questions in the system.
   */
  public questions: Question[];

  /**
   * An in-memory list of all tags in the system.
   */
  public tags: Tag[];

  /**
   * An in-memory list of all answers in the system.
   */
  public answers: Answer[];

  /**
   * private constructor to create a singleton instance of the Application
   * @param data - the questions, tags, and answers to be stored in the application
   * @returns the singleton instance of the Application class
   */
  private constructor({ questions, tags, answers }: ApplicationProps) {
    this.questions = [];
    this.tags = [];
    this.answers = [];

    questions.forEach((q) => {
      this.questions.push(new Question(q));
    });

    tags.forEach((t) => {
      this.tags.push(new Tag(t));
    });

    answers.forEach((a) => {
      this.answers.push(new Answer(a));
    });
  }

  /**
   * A mapping from order names to comparator functions.
   * This encapsulates the sorting logic using a strategy pattern.
   */
  private sortingStrategies: { [key: string]: (a: Question, b: Question) => number } = {
    newest: (a, b) => b.askDate.getTime() - a.askDate.getTime(),
    active: (a, b) => {
      // For "active": sort by newest answer date descending if available,
      // otherwise fall back to ask date descending.
      if (a.newAnsDate && !b.newAnsDate) return -1;
      if (!a.newAnsDate && b.newAnsDate) return 1;
      if (a.newAnsDate && b.newAnsDate) {
        return b.newAnsDate.getTime() - a.newAnsDate.getTime();
      }
      return b.askDate.getTime() - a.askDate.getTime();
    },
    unanswered: (a, b) => {
      // For unanswered, we sort by askDate descending.
      return b.askDate.getTime() - a.askDate.getTime();
    }
  };

  /**
   * getInstance method to get the singleton instance of the Application
   * @param data - the questions, tags, and answers to be stored in the application
   * @returns a singleton instance of the Application
   */
  public static getInstance(data: ApplicationProps): Application {
    if (!Application.instance) {
      Application.instance = new Application(data);
    }
    return Application.instance;
  }

  /**
   * saves a new answer for a selected question
   * @param qid an existing question id to add the answer to
   * @param answer answer to be added (text and ansBy)
   * @returns a unique id for the answer added
   */
  public addAnswer = (qid: string, answer: { text: string; ansBy: string }): string => {
    // 1) Find question
    const question = this.getQuestionById(qid);
    if (!question) {
      // If question doesn't exist, return a dummy
      // or could throw an Error
      return "";
    }

    // 2) Create new answer with a unique ID
    const aid = `a${this.answers.length + 1}`;
    const ansDate = new Date();
    const newAnswer = new Answer({
      aid,
      text: answer.text,
      ansBy: answer.ansBy,
      ansDate,
    });

    // 3) Push the new answer into global answers array
    this.answers.push(newAnswer);

    // 4) Add answer id into the question's ansIds
    question.addAnswer(aid);

    // 5) Update the newest answer date in the question for "active" ordering
    question.setNewestAnswerDate(ansDate);

    return aid;
  };

  /**
   * saves a new question to the application
   * @param question - the question to be added
   * @returns a unique id for the question added
   */
  public addQuestion = (question: {
    title: string;
    text: string;
    askedBy: string;
    tags: string[];
  }): string => {
    // 1) Build a new question ID
    const qid = `q${this.questions.length + 1}`;

    // 2) Resolve or create each tag in question.tags
    const resolvedTagIds = question.tags.map((tagName) => this.addTag(tagName));

    // 3) Create the new question
    const newQ = new Question({
      qid,
      title: question.title,
      text: question.text,
      askedBy: question.askedBy,
      askDate: new Date(),
      tagIds: resolvedTagIds,
      ansIds: [],
      views: 0,
    });

    // 4) Insert it into this.questions
    this.questions.push(newQ);

    return qid;
  };

  /**
   * adds a tag if it does not exist; otherwise returns the existing tag id
   * @param tagname - the name of the tag to be added/queried
   * @returns the id of the existing or newly created tag
   */
  public addTag = (tagname: string): string => {
    // 1) Check if this tag already exists (case-insensitive match)
    const existingTag = this.tags.find(
      (t) => t.name.toLowerCase() === tagname.toLowerCase()
    );
    if (existingTag) {
      return existingTag.tid;
    }

    // 2) If it doesn't exist, create a new tag
    const tid = `t${this.tags.length + 1}`;
    const newTag = new Tag({ tid, name: tagname });
    this.tags.push(newTag);

    return tid;
  };

  /**
   * retrieves the number of questions associated with an existing tag
   * @param tid an existing tag id in the application
   * @returns the number of questions associated with the tag
   */
  public getQuestionCountByTag = (tid: string): number => {
    return this.questions.filter((q) => q.tagIds.includes(tid)).length;
  };

  /**
   * Helper method to parse user-entered search string into two components:
   *  - bracketedTags = array of tag strings within [ ] (exact match required)
   *  - keywords      = array of leftover words to match in question title/text
   */
  private parseSearchString(searchStr: string) {
    // 1) Extract bracketed tags via regex
    const bracketRegex = /\[([^\]]+)\]/g;
    const bracketedTags: string[] = [];
    let match;
    let inputCopy = searchStr;

    while ((match = bracketRegex.exec(searchStr)) !== null) {
      bracketedTags.push(match[1]); // The text inside [ ... ]
      // Remove this exact match from the input so we don't double-count it
      inputCopy = inputCopy.replace(match[0], " ");
    }

    // 2) The leftover (trimmed) are normal words
    const leftover = inputCopy.trim();
    const keywords = leftover.length > 0 ? leftover.split(/\s+/) : [];

    return { bracketedTags, keywords };
  }

  /**
   * retrieves a slice of questions in the application
   * of length 5, starting from a given index,
   * matching a specified order and a search criteria
   * @param startIndex the index to start retrieving questions from
   * @param order the display order of the questions, allowed values are "newest", "active", "unanswered"
   * @param search the search string entered by the user
   * @returns a object containing the slice of questions
   *          and the total number of questions matching the criteria and the order
   */
  public getQuestionsByFilter = (
    startIndex = 0,
    order = "newest",
    search = ""
  ): QuestionsFilterType => {
    if (this.questions.length === 0) {
      return { qSlice: [], qLength: 0 };
    }
  
    // Parse out bracketed tags vs leftover keywords
    const { bracketedTags, keywords } = this.parseSearchString(search);
  
    // If search string is empty, include all questions.
    const searchNotEmpty = search.trim() !== "";
  
    // Helper function to map a tag name to its tid.
    const nameToTid = (tagName: string): string | null => {
      const found = this.tags.find(
        (tg) => tg.name.toLowerCase() === tagName.toLowerCase()
      );
      return found ? found.tid : null;
    };
  
    // New filtering logic: use OR logic.
    let filtered = this.questions.filter((q) => {
      // If search is empty, include all questions.
      if (!searchNotEmpty) return true;
  
      // Check for a tag match if any bracketed tags exist.
      const tagMatches = bracketedTags.length > 0
        ? bracketedTags.some((tName) => {
            const tid = nameToTid(tName);
            return tid ? q.tagIds.includes(tid) : false;
          })
        : false;
  
      // Check for a keyword match if any keywords exist.
      const keywordMatches = keywords.length > 0
        ? keywords.some((kw) => {
            const lowerKw = kw.toLowerCase();
            return (
              q.title.toLowerCase().includes(lowerKw) ||
              q.text.toLowerCase().includes(lowerKw)
            );
          })
        : false;
  
      // Include the question if EITHER condition is met.
      return tagMatches || keywordMatches;
    });
  
    // (Optional: update active ordering logic if needed.)
    if (order.toLowerCase() === "active") {
      filtered.forEach((q) => {
        if (q.getAnswerCount() > 0 && !q.newAnsDate) {
          const answersForQ = this.getQuestionAnswer(q);
          if (answersForQ.length > 0) {
            q.newAnsDate = answersForQ[0].ansDate;
          }
        }
      });
    }
  
    // Apply sorting strategy.
    if (order.toLowerCase() === "unanswered") {
      // For unanswered, filter to questions with no answers.
      filtered = filtered.filter((q) => q.getAnswerCount() === 0);
    }
    const comparator =
      this.sortingStrategies[order.toLowerCase()] ||
      this.sortingStrategies["newest"];
    filtered.sort(comparator);
  
    // Slice the filtered array (assume 5 questions per page).
    const totalMatches = filtered.length;
    const qSlice = filtered.slice(startIndex, startIndex + 5);
  
    return {
      qSlice,
      qLength: totalMatches,
    };
  };
  

  /**
   * retrieve a question object by its id
   * @param qid
   * @returns a question object if the question id exists in the application,
   *          otherwise returns undefined
   */
  public getQuestionById = (qid: string | undefined): Question | undefined => {
    if (!qid) return undefined;
    return this.questions.find((q) => q.qid === qid);
  };

  /**
   * retrieves the answers to a question
   * @param question a question object or null
   * @returns an array of answer objects to the question sorted by newest answer first
   */
  public getQuestionAnswer = (question: Question | null): Answer[] => {
    if (!question) return [];

    // Each question has an array of answer IDs in ansIds
    const result: Answer[] = [];
    question.ansIds.forEach((aid) => {
      const ansObj = this.answers.find((a) => a.aid === aid);
      if (ansObj) {
        result.push(ansObj);
      }
    });

    // Newest answer first => sort desc by ansDate
    result.sort((a, b) => b.ansDate.getTime() - a.ansDate.getTime());
    return result;
  };

  /**
   * 
   * @returns the number of tags in the application
   */
  public getTagCount = (): number => {
    return this.tags.length;
  };

  /**
   * 
   * @returns an array of tag objects in the application
   */
  public getTags = (): Tag[] => {
    return this.tags;
  };

  /**
   * retrieves a tag object by its id
   * @param id an existing tag id in the application
   * @returns a tag object if the tag id exists in the application
   * otherwise returns null
   */
  public getTagById = (id: string): Tag | null => {
    const found = this.tags.find((t) => t.tid === id);
    return found || null;
  };
}
