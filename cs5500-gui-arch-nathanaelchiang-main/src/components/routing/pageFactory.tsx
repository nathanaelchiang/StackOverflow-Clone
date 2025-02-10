import { PageClassParams } from "../../types/types";
import HomePageClass from "./home";
import TagPageClass from "./tag";
import PageClass from ".";

export default function getPage({ pageName, params }: { pageName: string, params: PageClassParams }): PageClass {
    let page: PageClass = HomePageClass.HomePageClassBuilder(params.app)
        .setClickTagFunc(params.clickTag)
        .setHandleAnswerFunc(params.handleAnswer)
        .setHandleNewQuestionFunc(params.handleNewQuestion)
        .setSetQuestionOrderFunc(params.setQuestionOrder)
        .setSetQuestionPageFunc(params.setQuestionPage)
        .build();
    page.setSearch(params.search);
    page.setQuestionOrderType(params.questionOrder);
    switch (pageName) {
        case "home":
            return page;
        case "tag":
            page = TagPageClass.TagPageClassBuilder(params.app)
                .setClickTagFunc(params.clickTag)
                .setHandleNewQuestionFunc(params.handleNewQuestion)
                .build();
            return page;
        default:
            return page;
    }
}