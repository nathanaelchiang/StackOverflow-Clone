import "./index.css";
import QuestionHeader from "./header";
import Question from "./question";
import { QuestionPageProps } from "../../../types/types";
import Pagination from "../../pagination";

/**
 * A container component that displays a list of questions
 * @param param0 the input props for the component -- the data to be displayed
 * and the functions to be called when the user interacts with the component
 * @returns a component that displays a list of questions
 */

const QuestionPage = ({
    title_text = "All Questions",
    qlist = [],
    qSize = 0,
    search,
    pageNum,
    getTagById,
    setQuestionOrder,
    clickTag,
    handleAnswer,
    handleNewQuestion,
    setQuestionPage,
}: QuestionPageProps) => {
    return (
        <>
            <QuestionHeader
    title_text={title_text}
    qcnt={qSize}
    setQuestionOrder={setQuestionOrder}
    handleNewQuestion={handleNewQuestion}
/>
{/* Wrap Header and Pagination in a Flexbox */}
<div className="header-container">
    <Pagination
        pageNum={pageNum}
        qSize={qSize}
        search={search}
        title={title_text}
        setQuestionPage={setQuestionPage}
    />
</div>

            <div id="question_list" className="question_list">
                {
                    qlist.map((q) => (
                        <Question
                            q={q}
                            key={q.qid}
                            getTagById={getTagById}
                            clickTag={clickTag}
                            handleAnswer={handleAnswer}
                        />
                    ))}
            </div>
            {title_text === "All Questions" && qlist.length === 0 && (
                <div className="bold_title right_padding">
                    No Questions Found
                </div>
            )}
        </>
    );
};

export default QuestionPage;
