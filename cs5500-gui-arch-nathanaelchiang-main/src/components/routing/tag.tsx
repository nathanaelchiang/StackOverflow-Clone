import React from "react";
import PageClass from "./index";
import TagPage from "../Main/tagPage";
import { ApplicationInterface, StringHandler, NoParamHandler } from "../../types/types";

export default class TagPageClass extends PageClass {

    private clickTag?: StringHandler;
    private handleNewQuestion?: NoParamHandler;

    private constructor(app: ApplicationInterface) {
        super(app);
    }

    public static TagPageClassBuilder(app: ApplicationInterface): TagPageClass {
        return new TagPageClass(app);
    }

    public setClickTagFunc(clickTag: StringHandler): TagPageClass {
        this.clickTag = clickTag;
        return this;
    }

    public setHandleNewQuestionFunc(handleNewQuestion: NoParamHandler): TagPageClass {
        this.handleNewQuestion = handleNewQuestion;
        return this;
    }

    public build(): TagPageClass {
        return this;
    }

    public getContent() {
        return (
            <TagPage
                tlist={this.getApp().getTags()}
                getQuestionCountByTag={this.getApp().getQuestionCountByTag}
                clickTag={this.clickTag}
                handleNewQuestion={this.handleNewQuestion}
            />
        );
    }

    public getSelected() {
        return "t";
    }
}