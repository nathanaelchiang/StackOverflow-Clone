import React from "react";
import "./index.css";
import OrderButton from "./orderButton";
import { QuestionHeaderProps } from "../../../../types/types";

/**
 * A container component for th header of the page that displays a list of questions
 * @param param0 input props for the component -- the metadata 
 * and the functions to handle the order of the questions and add new questions
 * @returns the container component for the header of the page that displays a list of questions
 */

const QuestionHeader = ({
    title_text,
    qcnt,
    setQuestionOrder,
    handleNewQuestion,
}: QuestionHeaderProps) => {
    return (
        <div>
            <div className="space_between right_padding">
                <div className="bold_title">{title_text}</div>
                <button className="bluebtn"> Ask a Question </button>
            </div>
            <div className="space_between right_padding">
                <div id="question_count">{qcnt} questions</div>
                <div className="btns">
                    {["Newest", "Active", "Unanswered"].map((m, idx) => (
                        <OrderButton
                            key={idx}
                            message={m}
                            setQuestionOrder={setQuestionOrder}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestionHeader;
