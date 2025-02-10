import { TagParamType } from "../types/types";

/**
 * Tag class to represent a tag object
 */
export default class Tag {
    tid: string;
    name: string;

    /**
     * constructor to initialize the properties in a Tag object
     * @param param0 TagParamType object
     * @returns Tag object
     */
    constructor({ tid, name }: TagParamType) {
        this.tid = tid;
        this.name = name;
    }
}
