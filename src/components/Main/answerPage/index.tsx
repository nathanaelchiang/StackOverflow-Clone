import React from "react";
import AnswerHeader from "./header";
import QuestionBody from "./questionBody";
import Answer from "./answer";
import { AnswerPageProps } from "../../../types/types";
import "./index.css";

/**
 * The container component for the AnswerPage
 * @param param0 the props for the AnswerPage component -- the data and the functions to set the pageInstance
 * @returns the AnswerPage component
 */
const AnswerPage = ({ question, ans, handleNewQuestion, handleNewAnswer }: AnswerPageProps) => {
  /**
   * Renders the list of answers or a placeholder message if no answers exist.
   * @returns JSX element containing the list of answers or a message.
   */
  const renderAnswers = () => {
    if (ans.length === 0) {
      return <p>No answers yet. Be the first to answer!</p>;
    }
    return ans.map((answer, idx) => (
      <Answer
        key={idx}
        text={answer.text}
        ansBy={answer.ansBy}
        meta={answer.calculateTimeElapsed()}
      />
    ));
  };

  return (
    <div id="answerPage" className="answerPageContainer">
      <AnswerHeader
        title={question.title}
        ansCount={ans.length}
        handleNewQuestion={handleNewQuestion}
      />
      <QuestionBody
        views={question.views}
        text={question.text}
        askby={question.askedBy}
        meta={question.calculateTimeElapsed()}
      />
      <div id="answersList">
        <h2>Answers</h2>
        {renderAnswers()}
      </div>
      <div id="newAnswer">
        <button onClick={handleNewAnswer} className="add-answer-btn">
          Answer Question
        </button>
      </div>
    </div>
  );
};

export default AnswerPage;
