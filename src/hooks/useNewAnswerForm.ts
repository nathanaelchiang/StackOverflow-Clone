// src/hooks/useNewAnswerForm.ts
import { useState } from "react";
import { NewAnswerProps } from "../types/types";

/**
 * Custom hook to encapsulate the state and logic for the NewAnswer form.
 * @param qid - The question id for which the answer is being posted.
 * @param addAnswer - Function to add a new answer.
 * @param handleAnswer - (Optional) Function to navigate back or refresh the answer page.
 * @returns An object containing the form state and the submit handler.
 */
const useNewAnswerForm = (
  qid: string,
  addAnswer: NewAnswerProps["addAnswer"],
  handleAnswer?: NewAnswerProps["handleAnswer"]
) => {
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState({ text: "", username: "" });

  const validate = (): boolean => {
    let valid = true;
    const newErrors = { text: "", username: "" };

    if (!text.trim()) {
      newErrors.text = "Answer text cannot be empty";
      valid = false;
    }
    if (!username.trim()) {
      newErrors.username = "Username cannot be empty.";
      valid = false;
    }

    setError(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      addAnswer(qid, { text, ansBy: username });
      // Reset form fields
      setText("");
      setUsername("");
      // Navigate back (if handleAnswer provided)
      if (handleAnswer) {
        handleAnswer(qid);
      }
    }
  };

  return { text, setText, username, setUsername, error, handleSubmit };
};

export default useNewAnswerForm;
