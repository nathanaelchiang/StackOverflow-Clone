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
    newAnsDate?: Date;

    /**
     * the constructor to initialize the properties in a Question object
     * @param param0 QuestionParamType object
     * @returns Question object
     */
    constructor({ qid, title, text, tagIds, askedBy, askDate, ansIds, views }: QuestionParamType) {
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
     * 
     * @returns the number of answers for a question
     */
    getAnswerCount() {
        return 0;
    }

    /**
     * adds a new answer id to the question
     * @param aid the answer id to be added to the question
     */
    addAnswer(aid: string) {
        console.log("Adding answer to question");
    }

    /**
     * 
     * @returns an array of answer ids for a question
     */
    getAnswersId() {
        return this.ansIds;
    }

    /**
     * 
     * @returns an array of tag ids for a question
     */
    getTagsId() {
        return this.tagIds;
    }

    /**
     * 
     * @returns the time elapsed since the question was posted
     */
    calculateTimeElapsed() {
        return getMetaData(this.askDate);
    }

    /**
     * 
     * @returns the number of views for a question
     */
    getQuestionViews() {
        return 0;
    }

    /**
     * increments the view count for a question by 1
     */
    addViewCount() {
        console.log("Adding view count to question");
    }

    /**
     * sets the date of the newest answer for a question
     * @param date the date to be compared with the newest answer date
     */
    setNewestAnswerDate(date: Date) {
        console.log("Setting newest answer date");
    }
}
