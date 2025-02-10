import { PageClassParams } from "../../types/types";
import HomePageClass from "./home";
import TagPageClass from "./tag";
import PageClass from ".";
import AnswerPageClass from "./answer";
import NewAnswerPageClass from "./newAnswer";
import NewQuestionPageClass from "./newQuestion";

/**
 * Factory function to get a PageClass instance based on the page name and parameters.
 * @param param0 - An object containing the page name and associated parameters.
 * @returns An instance of a PageClass corresponding to the requested page.
 */
export default function getPage({ pageName, params }: { pageName: string; params: PageClassParams }): PageClass {
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
      const tagPage = TagPageClass.TagPageClassBuilder(params.app)
        .setClickTagFunc(params.clickTag)
        .setHandleNewQuestionFunc(params.handleNewQuestion)
        .build();
      tagPage.setSearch(params.search);
      return tagPage;
    case "answer": {
      // Build the specialized AnswerPageClass
      const ansPage = AnswerPageClass.AnswerPageClassBuilder(params.app)
        .setHandleNewQuestionFunc(params.handleNewQuestion)
        .setHandleNewAnswerFunc(params.handleNewAnswer)
        .build();
      ansPage.setQid(params.qid);
      return ansPage;
    }
    case "newAnswer": {
      // Build the specialized NewAnswerPageClass
      const newAnsPage = NewAnswerPageClass.NewAnswerPageClassBuilder(params.app)
        .setHandleAnswerFunc(params.handleAnswer)
        .build();
      // Pass in the qid so the new answer form knows which question to answer.
      newAnsPage.setQid(params.qid);
      return newAnsPage;
    }
    case "newQuestion": {
      const newQPage = NewQuestionPageClass.NewQuestionPageClassBuilder(params.app)
        .setHandleQuestionsFunc(params.handleQuestions)
        .build();
      return newQPage;
    }
    default:
      return page;
  }
}
