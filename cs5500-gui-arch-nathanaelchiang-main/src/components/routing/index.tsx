import { ApplicationInterface } from "../../types/types";


export default abstract class PageClass {
    private app: ApplicationInterface;
    protected search?: string;
    protected questionOrder?: string;
    protected title?: string;
    protected qid = "";
    protected pageIndex = 0;

    protected constructor(app: ApplicationInterface) {
        this.app = app;
    }

    public setSearch(search: string) {
        this.search = search;
    }

    public setQuestionOrderType(questionOrder: string) {
        this.questionOrder = questionOrder;
    }

    public setQid(qid: string) {
        this.qid = qid;
    }

    public setTitle(title: string) {
        this.title = title;
    }

    public setPageIndex(index: number) {
        this.pageIndex = index;
    }

    public abstract getContent(): JSX.Element | null;

    public abstract getSelected(): string;

    public getApp(): ApplicationInterface {
        return this.app;
    }
}
