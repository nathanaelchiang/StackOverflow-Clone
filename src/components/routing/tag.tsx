import React from "react";
import PageClass from "./index";
import TagPage from "../Main/tagPage";
import { ApplicationInterface, StringHandler, NoParamHandler } from "../../types/types";

/**
 * Class representing the Tag Page.
 * Extends the base PageClass to render the tags and associated questions.
 */
export default class TagPageClass extends PageClass {
  private clickTag?: StringHandler;
  private handleNewQuestion?: NoParamHandler;

  /**
   * Private constructor for TagPageClass.
   * @param app - The application interface.
   */
  private constructor(app: ApplicationInterface) {
    super(app);
  }

  /**
   * Builder for TagPageClass.
   * @param app - The application interface.
   * @returns A new instance of TagPageClass.
   */
  public static TagPageClassBuilder(app: ApplicationInterface): TagPageClass {
    return new TagPageClass(app);
  }

  /**
   * Sets the function to handle tag clicks.
   * @param clickTag - The function to handle tag clicks.
   * @returns The current instance of TagPageClass.
   */
  public setClickTagFunc(clickTag: StringHandler): TagPageClass {
    this.clickTag = clickTag;
    return this;
  }

  /**
   * Sets the function to handle new question actions.
   * @param handleNewQuestion - The function to handle new question actions.
   * @returns The current instance of TagPageClass.
   */
  public setHandleNewQuestionFunc(handleNewQuestion: NoParamHandler): TagPageClass {
    this.handleNewQuestion = handleNewQuestion;
    return this;
  }

  /**
   * Finalizes the building of the TagPageClass.
   * @returns The built TagPageClass instance.
   */
  public build(): TagPageClass {
    return this;
  }

  /**
   * Returns the content for the Tag Page.
   * Renders the TagPage component with tag list and question count.
   * @returns JSX element for the tag page.
   */
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

  /**
   * Returns the selected menu item.
   * @returns "t" to indicate the Tags tab is selected.
   */
  public getSelected() {
    return "t";
  }
}
