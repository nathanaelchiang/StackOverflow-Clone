import React from "react";
import PageClass from ".";
import NewAnswer from "../Main/newAnswer";
import { StringHandler, ApplicationInterface } from "../../types/types";

/**
 * Class representing the New Answer Page.
 * Extends the base PageClass to render a form for adding a new answer.
 */
export default class NewAnswerPageClass extends PageClass {
  private handleAnswer?: StringHandler;

  /**
   * Private constructor for NewAnswerPageClass.
   * @param app - The application interface.
   */
  private constructor(app: ApplicationInterface) {
    super(app);
  }

  /**
   * Builder for NewAnswerPageClass.
   * @param app - The application interface.
   * @returns A new instance of NewAnswerPageClass.
   */
  public static NewAnswerPageClassBuilder(app: ApplicationInterface): NewAnswerPageClass {
    return new NewAnswerPageClass(app);
  }

  /**
   * Sets the function to handle answer actions.
   * @param handleAnswer - The function to handle answers.
   * @returns The current instance of NewAnswerPageClass.
   */
  public setHandleAnswerFunc(handleAnswer: StringHandler): NewAnswerPageClass {
    this.handleAnswer = handleAnswer;
    return this;
  }

  /**
   * Finalizes the building of the NewAnswerPageClass.
   * @returns The built NewAnswerPageClass instance.
   */
  public build(): NewAnswerPageClass {
    return this;
  }

  /**
   * Returns the content for the New Answer Page.
   * Renders the NewAnswer component.
   * @returns JSX element for the new answer page.
   */
  public getContent() {
    console.log(this);
    return <NewAnswer qid={this.qid} addAnswer={this.getApp().addAnswer} handleAnswer={this.handleAnswer} />;
  }

  /**
   * Returns the selected menu item.
   * @returns An empty string as no sidebar item is selected.
   */
  public getSelected() {
    return "";
  }
}
