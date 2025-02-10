import React from "react";
import PageClass from "./index";
import AnswerPage from "../Main/answerPage";
import { NoParamHandler, ApplicationInterface } from "../../types/types";

/**
 * Class representing the Answer Page.
 * Extends the base PageClass to render an answer page.
 */
export default class AnswerPageClass extends PageClass {
  private handleNewQuestion?: NoParamHandler;
  private handleNewAnswer?: NoParamHandler;

  /**
   * Private constructor for AnswerPageClass.
   * @param app - The application interface.
   */
  private constructor(app: ApplicationInterface) {
    super(app);
  }

  /**
   * Builder for AnswerPageClass.
   * @param app - The application interface.
   * @returns A new instance of AnswerPageClass.
   */
  public static AnswerPageClassBuilder(app: ApplicationInterface): AnswerPageClass {
    return new AnswerPageClass(app);
  }

  /**
   * Sets the callback for handling new questions.
   * @param fn - The function to handle new questions.
   * @returns The current instance of AnswerPageClass.
   */
  public setHandleNewQuestionFunc(fn: NoParamHandler): AnswerPageClass {
    this.handleNewQuestion = fn;
    return this;
  }

  /**
   * Sets the callback for handling new answers.
   * @param fn - The function to handle new answers.
   * @returns The current instance of AnswerPageClass.
   */
  public setHandleNewAnswerFunc(fn: NoParamHandler): AnswerPageClass {
    this.handleNewAnswer = fn;
    return this;
  }

  /**
   * Finalizes the building of the AnswerPageClass.
   * @returns The built AnswerPageClass instance.
   */
  public build(): AnswerPageClass {
    return this;
  }

  /**
   * Returns the content for the Answer Page.
   * If the question is not found, returns a "not found" message.
   * Otherwise, renders the AnswerPage component.
   * @returns JSX element for the answer page.
   */
  public getContent() {
    const question = this.getApp().getQuestionById(this.qid);
    if (!question) {
      return (
        <div>
          <h1>Question Not Found</h1>
          <p>The question you are looking for does not exist or has been removed.</p>
        </div>
      );
    }

    // Increment the question's view count.
    question.addViewCount();
    // Get all answers for this question.
    const ans = this.getApp().getQuestionAnswer(question);

    // Render the AnswerPage component.
    return (
      <AnswerPage
        question={question}
        ans={ans}
        handleNewQuestion={this.handleNewQuestion}
        handleNewAnswer={this.handleNewAnswer}
      />
    );
  }

  /**
   * Returns the selected menu item.
   * @returns An empty string since no sidebar highlight is needed.
   */
  public getSelected() {
    return "";
  }
}
