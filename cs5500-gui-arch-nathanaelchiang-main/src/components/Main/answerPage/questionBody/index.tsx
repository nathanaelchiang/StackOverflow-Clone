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
    <div id="questionBody">
      Question Body
    </div>
  );
};

export default QuestionBody;
