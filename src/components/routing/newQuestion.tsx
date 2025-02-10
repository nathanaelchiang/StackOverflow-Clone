import React from "react";
import PageClass from "./index";
import NewQuestion from "../Main/newQuestion";
import { ApplicationInterface, NoParamHandler } from "../../types/types";

/**
 * Class representing the New Question Page.
 * Extends the base PageClass to render a form for adding a new question.
 */
export default class NewQuestionPageClass extends PageClass {
  private handleQuestions?: NoParamHandler;

  /**
   * Private constructor for NewQuestionPageClass.
   * @param app - The application interface.
   */
  private constructor(app: ApplicationInterface) {
    super(app);
  }

  /**
   * Builder for NewQuestionPageClass.
   * @param app - The application interface.
   * @returns A new instance of NewQuestionPageClass.
   */
  public static NewQuestionPageClassBuilder(app: ApplicationInterface): NewQuestionPageClass {
    return new NewQuestionPageClass(app);
  }

  /**
   * Sets the function to handle new question actions.
   * @param handleQuestions - The function to handle new questions.
   * @returns The current instance of NewQuestionPageClass.
   */
  public setHandleQuestionsFunc(handleQuestions: NoParamHandler): NewQuestionPageClass {
    this.handleQuestions = handleQuestions;
    return this;
  }

  /**
   * Finalizes the building of the NewQuestionPageClass.
   * @returns The built NewQuestionPageClass instance.
   */
  public build(): NewQuestionPageClass {
    return this;
  }

  /**
   * Returns the content for the New Question Page.
   * Renders the NewQuestion component.
   * @returns JSX element for the new question page.
   */
  public getContent() {
    console.log(this);
    return <NewQuestion addQuestion={this.getApp().addQuestion} handleQuestions={this.handleQuestions} />;
  }

  /**
   * Returns the selected menu item.
   * @returns An empty string as no sidebar item is selected.
   */
  public getSelected() {
    return "";
  }
}
