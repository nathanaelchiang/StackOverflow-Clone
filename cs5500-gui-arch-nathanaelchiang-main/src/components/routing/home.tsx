import React from 'react';
import PageClass from './index';
import QuestionPage from '../Main/questionPage';
import { ApplicationInterface, SetQuestionPage, StringHandler, NoParamHandler } from '../../types/types';

export default class HomePageClass extends PageClass {
    private setQuestionPage?: SetQuestionPage;
    private setQuestionOrder?: StringHandler;
    public handleAnswer?: StringHandler;
    public clickTag?: StringHandler;
    public handleNewQuestion?: NoParamHandler;

    private constructor(app: ApplicationInterface) {
        super(app);
    }

    public static HomePageClassBuilder(app: ApplicationInterface): HomePageClass {
        return new HomePageClass(app);
    }

    public setSetQuestionPageFunc(setQuestionPage: SetQuestionPage): HomePageClass {
        this.setQuestionPage = setQuestionPage;
        return this;
    }

    public setSetQuestionOrderFunc(setQuestionOrder: StringHandler): HomePageClass {
        this.setQuestionOrder = setQuestionOrder;
        return this;
    }

    public setHandleAnswerFunc(handleAnswer: StringHandler): HomePageClass {
        this.handleAnswer = handleAnswer;
        return this;
    }

    public setClickTagFunc(clickTag: StringHandler): HomePageClass {
        this.clickTag = clickTag;
        return this;
    }

    public setHandleNewQuestionFunc(handleNewQuestion: NoParamHandler): HomePageClass {
        this.handleNewQuestion = handleNewQuestion;
        return this;
    }

    public build(): HomePageClass {
        return this;
    }

    public getContent() {
        try {
            const qFilterResult = this.getApp().getQuestionsByFilter(this.pageIndex, this.questionOrder?.toLowerCase(), this.search);
            return (
                <QuestionPage
                    title_text={this.title}
                    qlist={qFilterResult.qSlice}
                    qSize ={qFilterResult.qLength}
                    search={this.search}
                    pageNum={this.pageIndex}
                    getTagById={this.getApp().getTagById}
                    setQuestionOrder={this.setQuestionOrder}
                    clickTag={this.clickTag}
                    handleAnswer={this.handleAnswer}
                    handleNewQuestion={this.handleNewQuestion}
                    setQuestionPage={this.setQuestionPage}
                />
            );
        }
        catch (e) {
            console.error(`Failed to set QuestionPage props: ${e}`);
            return null;
        }
    }

    public getSelected() {
        return "q";
    }
}