import "./index.css";
import React from "react";
import { QuestionBodyProps } from "../../../../types/types";

/**
 * The answer renders the question information after the header
 * @param param0 the input props needed to render the question body
 * @returns the question body component
 */
const QuestionBody = ({ views, text, askby, meta }: QuestionBodyProps) => {
  return (
    <div id="questionBody" className="question-body-container">
      <div className="question-meta">
        <b>{views} views</b>
        <span className="question-text">{text}</span>
      </div>
      <div className="question-author">
        <span className="question-asker">{askby}</span>
        <span className="question-time">{meta}</span>
      </div>
    </div>
  );
};


export default QuestionBody;
