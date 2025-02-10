import Question from "./question";
import Tag from "./tag";
import Answer from "./answer";
import { ApplicationInterface, ApplicationProps } from "../types/types";

/**
 * The class encapsulate the application data
 * and operations to manipulate the data.
 * The class is a singleton class.
 * All the data is stored in memory.
 * While this is an obvious limitation for large datasets
 * it is sufficient for a prototype such as this one.
 * @implements ApplicationInterface
 */

export default class Application implements ApplicationInterface {
    private static instance: Application;
    questions: Question[];
    tags: Tag[];
    answers: Answer[];

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
     * getInstance method to get the singleton instance of the Application
     * @param data - the questions, tags, and answers 
     * to be stored in the application
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
     * @param answer answer to be added
     * @returns a unique id for the answer added
     */
    addAnswer = (qid: string, answer: { text: string; ansBy: string }) => {
        return "aid";
    };

    /**
     * saves a new question to the application
     * @param question - the question to be added
     * @returns a unique id for the question added
     */
    addQuestion = (question: {
        title: string;
        text: string;
        askedBy: string;
        tags: string[];
    }) => {
        return "qid";
    };

    /**
     * adds a tag to a question if it does not exist
     * otherwise returns the tag id of an existing tagname
     * @param tagname - the name of the tag to be added
     * @returns existing tag or a new tag id
     */
    addTag = (tagname: string) => {
        return "tid";
    };

    /**
     * retrieves the number of questions associated with an existing tag
     * @param tid an existing tag id in the application
     * @returns the number of questions associated with the tag
     */
    getQuestionCountByTag = (tid: string) => {
        return 0;
    };

    /**
     * retrieves a slice of questions in the application
     * of length 5, starting from a given index that match a search criteria
     * in an order selected by the user
     * @param startIndex the index to start retrieving questions from
     * @param order the display order of the questions, 
     * allowed values are "newest", "active", "unanswered"
     * @param search the search string entered by the user
     * @returns a object containing the slice of questions 
     * and the total number of questions matching the criteria and the order
     */
    getQuestionsByFilter = (startIndex = 0, order = "newest", search = "") => {
        const filteredQuestions: Question[] = [];
        return {
            qSlice: filteredQuestions,
            qLength: filteredQuestions.length
        };
    };

    /**
     * retrieve a question object by its id
     * @param qid 
     * @returns a question object if the question id exists in the application
     * otherwise returns undefined
     */
    getQuestionById = (qid: string | undefined) : Question | undefined => {
        return this.questions[0];
    };

    /**
     * retrieves the answers to a question
     * @param question a question object or null
     * @returns an array of answer objects to the question
     * the answers are sorted by the date they were added,
     * that is, the newest answer is the first in the array
     */
    getQuestionAnswer = (question: Question | null) => {
        return this.answers;
    };

    /**
     * 
     * @returns the number of tags in the application
     */
    getTagCount = () => {
        return this.tags.length;
    };

    /**
     * 
     * @returns an array of tag objects in the application
     */
    getTags = () => {
        return this.tags;
    };

    /**
     * retrieves a tag object by its id
     * @param id an existing tag id in the application
     * @returns a tag object if the tag id exists in the application
     * otherwise returns null
     */
    getTagById = (id: string): Tag | null => {
        return null;
    };
}
