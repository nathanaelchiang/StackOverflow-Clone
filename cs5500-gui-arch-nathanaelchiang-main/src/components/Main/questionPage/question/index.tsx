import React, { useCallback } from "react";
import { QuestionProps, TagParamType } from "../../../../types/types";
import "./index.css";

interface qComponentProps {
    q: QuestionProps;
    getTagById: (tid: string) => TagParamType | null;
    clickTag?: (tagName: string) => void;
    handleAnswer?: (qid: string) => void;
}

/**
 * A component to display a question
 * @param param0 the props for the component -- data for the question 
 * and the functuions that will be called when a user interacts with the question
 * @returns a question to be displayed
 */
const Question = ({ q, getTagById, clickTag, handleAnswer }: qComponentProps) => {
    const handleQuestionClick = useCallback(() => {
        if(handleAnswer) handleAnswer(q.qid);
    }, [handleAnswer, q.qid]);

    return (
        <div
            className="question right_padding"
            onClick={handleQuestionClick}
            role="button"
            tabIndex={0}
        >
            <div className="postStats">
                <div>{q.getAnswerCount()} answers</div>
                <div>{q.getQuestionViews()} views</div>
            </div>
            <div className="question_mid">
                <div className="postTitle">{q.title}</div>
                <div className="question_tags">
                    {q.getTagsId().map((tid) => {
                        return (
                            <button key={tid} className="question_tag_button">
                                {tid}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="lastActivity">
                <div className="question_author">{q.askedBy}</div>
                <div>&nbsp;</div>
                <div className="question_meta">
                    asked {q.calculateTimeElapsed()}
                </div>
            </div>
        </div>
    );
};

export default Question;
