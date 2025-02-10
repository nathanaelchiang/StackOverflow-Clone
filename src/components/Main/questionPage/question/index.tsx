import React, { useCallback } from "react";
import { QuestionProps, TagParamType } from "../../../../types/types";
import "./index.css";

/**
 * Props for the Question component.
 * @interface qComponentProps
 * @property {QuestionProps} q - The question data.
 * @property {(tid: string) => TagParamType | null} getTagById - Function to retrieve tag details.
 * @property {(tagName: string) => void} [clickTag] - Optional function to handle tag clicks.
 * @property {(qid: string) => void} [handleAnswer] - Optional function to handle when a question is clicked.
 */
interface qComponentProps {
  q: QuestionProps;
  getTagById: (tid: string) => TagParamType | null;
  clickTag?: (tagName: string) => void;
  handleAnswer?: (qid: string) => void;
}

/**
 * A component that displays a single question with its metadata and associated tags.
 * @param {qComponentProps} props - The properties for rendering the question.
 * @returns A JSX element representing the question.
 */
const Question = ({ q, getTagById, clickTag, handleAnswer }: qComponentProps) => {
  /**
   * Handles clicking on the question, triggering the answer handler if provided.
   */
  const handleQuestionClick = useCallback(() => {
    if (handleAnswer) handleAnswer(q.qid);
  }, [handleAnswer, q.qid]);

  /**
   * Renders the tags associated with the question.
   * @returns {JSX.Element[]} An array of JSX elements representing the tags.
   */
  const renderTags = () => {
    return q.getTagsId().map((tid) => {
      const tag = getTagById(tid);
      if (!tag) return null;
      const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (clickTag) clickTag(tag.name);
      };
      return (
        <button
          key={tid}
          className="question_tag_button"
          onClick={onClickHandler}
        >
          {tag.name}
        </button>
      );
    });
  };

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
        <div className="question_tags">{renderTags()}</div>
      </div>
      <div className="lastActivity">
        <div className="question_author">{q.askedBy}</div>
        <div>&nbsp;</div>
        <div className="question_meta">asked {q.calculateTimeElapsed()}</div>
      </div>
    </div>
  );
};

export default Question;
