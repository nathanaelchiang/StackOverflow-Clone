import { ApplicationInterface } from "../../types/types";

/**
 * Abstract base class for pages in the application.
 * Provides common properties and methods for all page classes.
 */
export default abstract class PageClass {
  private app: ApplicationInterface;
  protected search?: string;
  protected questionOrder?: string;
  protected title?: string;
  protected qid = "";
  protected pageIndex = 0;

  /**
   * Constructs a PageClass instance.
   * @param app - The application interface.
   */
  protected constructor(app: ApplicationInterface) {
    this.app = app;
  }

  /**
   * Sets the search query.
   * @param search - The search string.
   */
  public setSearch(search: string) {
    this.search = search;
  }

  /**
   * Sets the question order type.
   * @param questionOrder - The question order type.
   */
  public setQuestionOrderType(questionOrder: string) {
    this.questionOrder = questionOrder;
  }

  /**
   * Sets the question ID.
   * @param qid - The question identifier.
   */
  public setQid(qid: string) {
    this.qid = qid;
  }

  /**
   * Sets the title for the page.
   * @param title - The title string.
   */
  public setTitle(title: string) {
    this.title = title;
  }

  /**
   * Sets the page index.
   * @param index - The index for pagination.
   */
  public setPageIndex(index: number) {
    this.pageIndex = index;
  }

  /**
   * Abstract method to get the content of the page.
   * @returns JSX element or null.
   */
  public abstract getContent(): JSX.Element | null;

  /**
   * Abstract method to get the selected sidebar item.
   * @returns A string representing the selected item.
   */
  public abstract getSelected(): string;

  /**
   * Returns the application interface.
   * @returns The application interface.
   */
  public getApp(): ApplicationInterface {
    return this.app;
  }
}
