import { AnswerPageProps } from "../../../types/types";
import "./index.css";

/**
 * The container component for the AnswerPage
 * @param param0 the props for the AnswerPage component -- the data and the functions to set the pageInstance
 * @returns the AnswerPage component
 */
const AnswerPage = ({ question, ans, handleNewQuestion, handleNewAnswer }: AnswerPageProps) => {
    return (
        <>
            Answer Page for a question
        </>
    );
};

export default AnswerPage;
