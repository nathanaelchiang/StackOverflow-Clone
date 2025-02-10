import { AnswerProps } from "../../../../types/types";
import "./index.css";

/**
 * The component to display the answer to a question.
 * @param param0 the input props for the Answer component.
 * @returns Answer component.
 */
const Answer = ({ text, ansBy, meta }: AnswerProps) => {
  return (
    <div className="answer-container">
      {/* Updated className to "answerText" so Cypress can find it */}
      <div className="answerText">{text}</div>
      <div className="answer-meta">
        {/* Combine author and meta information into one element */}
        <span className="answerAuthor">
          {ansBy} {meta}
        </span>
      </div>
    </div>
  );
};

export default Answer;
