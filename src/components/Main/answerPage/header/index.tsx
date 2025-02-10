import { AnswerHeaderProps } from "../../../../types/types";
import "./index.css";

/**
 * The component that displays the header of the answer page.
 * @param param0 input props for the component
 * @returns the header of the answer page
 */
const AnswerHeader = ({ ansCount, title, handleNewQuestion }: AnswerHeaderProps) => {
  return (
    <div id="answersHeader" className="answer-header-container">
  <span className="answer-count"><b>{ansCount} answers</b></span>
  <h1 className="answer-title">{title}</h1>
  <button className="bluebtn ask-question-btn" onClick={handleNewQuestion}>
    Ask a Question
  </button>
</div>

  );
};


export default AnswerHeader;
