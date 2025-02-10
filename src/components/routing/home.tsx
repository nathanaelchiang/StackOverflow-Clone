import React from "react";
import PageClass from "./index";
import QuestionPage from "../Main/questionPage";
import { ApplicationInterface, SetQuestionPage, StringHandler, NoParamHandler } from "../../types/types";

/**
 * Class representing the Home Page.
 * Extends the base PageClass to render the list of questions.
 */
export default class HomePageClass extends PageClass {
  private setQuestionPage?: SetQuestionPage;
  private setQuestionOrder?: StringHandler;
  private handleAnswer?: StringHandler;
  private clickTag?: StringHandler;
  private handleNewQuestion?: NoParamHandler;

  /**
   * Private constructor for HomePageClass.
   * @param app - The application interface.
   */
  private constructor(app: ApplicationInterface) {
    super(app);
  }

  /**
   * Builder for HomePageClass.
   * @param app - The application interface.
   * @returns A new instance of HomePageClass.
   */
  public static HomePageClassBuilder(app: ApplicationInterface): HomePageClass {
    return new HomePageClass(app);
  }

  /**
   * Sets the function to update the question page.
   * @param setQuestionPage - The function to set the question page.
   * @returns The current instance of HomePageClass.
   */
  public setSetQuestionPageFunc(setQuestionPage: SetQuestionPage): HomePageClass {
    this.setQuestionPage = setQuestionPage;
    return this;
  }

  /**
   * Sets the function to update the question order.
   * @param setQuestionOrder - The function to set the question order.
   * @returns The current instance of HomePageClass.
   */
  public setSetQuestionOrderFunc(setQuestionOrder: StringHandler): HomePageClass {
    this.setQuestionOrder = setQuestionOrder;
    return this;
  }

  /**
   * Sets the function to handle answer clicks.
   * @param handleAnswer - The function to handle answer clicks.
   * @returns The current instance of HomePageClass.
   */
  public setHandleAnswerFunc(handleAnswer: StringHandler): HomePageClass {
    this.handleAnswer = handleAnswer;
    return this;
  }

  /**
   * Sets the function to handle tag clicks.
   * @param clickTag - The function to handle tag clicks.
   * @returns The current instance of HomePageClass.
   */
  public setClickTagFunc(clickTag: StringHandler): HomePageClass {
    this.clickTag = clickTag;
    return this;
  }

  /**
   * Sets the function to handle new question actions.
   * @param handleNewQuestion - The function to handle new question actions.
   * @returns The current instance of HomePageClass.
   */
  public setHandleNewQuestionFunc(handleNewQuestion: NoParamHandler): HomePageClass {
    this.handleNewQuestion = handleNewQuestion;
    return this;
  }

  /**
   * Finalizes the building of the HomePageClass.
   * @returns The built HomePageClass instance.
   */
  public build(): HomePageClass {
    return this;
  }

  /**
   * Returns the content for the Home Page.
   * Renders the QuestionPage component with filtered questions.
   * @returns JSX element for the home page or null if an error occurs.
   */
  public getContent() {
    try {
      const qFilterResult = this.getApp().getQuestionsByFilter(
        this.pageIndex,
        this.questionOrder?.toLowerCase(),
        this.search
      );
      console.log("Filtered Questions:", qFilterResult.qSlice);
      return (
        <QuestionPage
          title_text={this.title}
          qlist={qFilterResult.qSlice}
          qSize={qFilterResult.qLength}
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
    } catch (e) {
      console.error(`Failed to set QuestionPage props: ${e}`);
      return null;
    }
  }

  /**
   * Returns the selected menu item.
   * @returns "q" to indicate the Questions tab is selected.
   */
  public getSelected() {
    return "q";
  }
}
