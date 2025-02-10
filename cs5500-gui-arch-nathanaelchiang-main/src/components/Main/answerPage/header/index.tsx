import { AnswerHeaderProps } from "../../../../types/types";
import "./index.css";

/**
 * The component that displays the header of the answer page.
 * @param param0 input props for the component
 * @returns the header of the answer page
 */

const AnswerHeader = ({ ansCount, title, handleNewQuestion }: AnswerHeaderProps) => {
    return (
        <div id="answersHeader" className="space_between right_padding">
            Answer Header
        </div>
    );
};

export default AnswerHeader;
