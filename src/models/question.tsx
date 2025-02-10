import { getMetaData } from "../util/dateFormatter";
import { QuestionParamType, QuestionPropsInterface } from "../types/types";

/**
 * Question class to represent a question object
 * and the operations that can be performed on it
 */
export default class Question implements QuestionPropsInterface {
  qid: string;
  title: string;
  text: string;
  tagIds: string[];
  askedBy: string;
  askDate: Date;
  ansIds: string[];
  views: number;
  /**
   * The date of the newest answer posted to this question.
   * Needed for "active" sorting.
   */
  newAnsDate?: Date;

  /**
   * the constructor to initialize the properties in a Question object
   * @param param0 QuestionParamType object
   * @returns Question object
   */
  constructor({
    qid,
    title,
    text,
    tagIds,
    askedBy,
    askDate,
    ansIds,
    views,
  }: QuestionParamType) {
    this.qid = qid;
    this.title = title;
    this.text = text;
    this.tagIds = tagIds;
    this.askedBy = askedBy;
    this.askDate = askDate;
    this.ansIds = ansIds;
    this.views = views;
  }

  /**
   * @returns the number of answers for a question
   */
  getAnswerCount(): number {
    return this.ansIds.length;
  }

  /**
   * adds a new answer id to the question
   * @param aid the answer id to be added to the question
   */
  addAnswer(aid: string): void {
    this.ansIds.push(aid);
  }

  /**
   * 
   * @returns the number of views for a question
   */
  getQuestionViews(): number {
    return this.views;
  }

  /**
   * increments the view count for a question by 1
   */
  addViewCount(): void {
    this.views += 1;
  }

  /**
   * sets (or updates) the date of the newest answer for a question
   * used for sorting questions by "active" order
   * @param date the date to compare with any existing newest answer date
   */
  setNewestAnswerDate(date: Date): void {
    // If there's no existing newAnsDate or 'date' is more recent, update
    if (!this.newAnsDate || date.getTime() > this.newAnsDate.getTime()) {
      this.newAnsDate = date;
    }
  }

  /**
   * 
   * @returns an array of answer ids for this question
   */
  getAnswersId(): string[] {
    return this.ansIds;
  }

  /**
   * 
   * @returns an array of tag ids for this question
   */
  getTagsId(): string[] {
    return this.tagIds;
  }

  /**
   * 
   * @returns the time elapsed since the question was posted (formatted for display)
   */
  calculateTimeElapsed(): string {
    return getMetaData(this.askDate);
  }
}
