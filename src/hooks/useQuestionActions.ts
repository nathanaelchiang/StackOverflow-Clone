import { useCallback } from "react";
import { QuestionProps } from "../types/types";

/**
 * Interface for the parameters of the useQuestionActions hook.
 *
 * @property {QuestionProps} q - The question object.
 * @property {(qid: string) => void} [handleAnswer] - Optional function to handle when a question is clicked.
 * @property {(tagName: string) => void} [clickTag] - Optional function to handle tag click events.
 */
interface UseQuestionActionsParams {
  q: QuestionProps;
  handleAnswer?: (qid: string) => void;
  clickTag?: (tagName: string) => void;
}

/**
 * Custom hook to extract non‑rendering logic for a Question component.
 * It returns a click handler for the question container and a function that returns a click handler for individual tag buttons.
 *
 * @param params - An object containing the question and optional event handler functions.
 * @returns An object with a handler for question clicks and a function to get tag click handlers.
 */
const useQuestionActions = ({ q, handleAnswer, clickTag }: UseQuestionActionsParams) => {
  /**
   * Handler for when the entire question is clicked.
   */
  const handleQuestionClick = useCallback(() => {
    if (handleAnswer) {
      handleAnswer(q.qid);
    }
  }, [handleAnswer, q.qid]);

  /**
   * Returns a click handler for a tag button that stops propagation and calls clickTag with the tag's name.
   *
   * @param tagName - The name of the tag.
   * @returns A click event handler for the tag button.
   */
  const getTagClickHandler = useCallback(
    (tagName: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (clickTag) {
        clickTag(tagName);
      }
    },
    [clickTag]
  );

  return { handleQuestionClick, getTagClickHandler };
};

export default useQuestionActions;
