// src/hooks/useNewQuestionForm.ts
import { useState } from "react";
import { NewQuestionProps } from "../types/types";

/**
 * Custom hook to manage state and logic for the NewQuestion form.
 * @param addQuestion - Function to add a new question.
 * @param handleQuestions - (Optional) Function to navigate after a question is submitted.
 * @returns Form state values and a submit handler.
 */
const useNewQuestionForm = (
  addQuestion: NewQuestionProps["addQuestion"],
  handleQuestions?: NewQuestionProps["handleQuestions"]
) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    text: "",
    tags: "",
    username: "",
  });

  const validate = (): boolean => {
    let valid = true;
    const newErrors = { title: "", text: "", tags: "", username: "" };

    if (!title.trim()) {
      newErrors.title = "Title cannot be empty.";
      valid = false;
    } else if (title.length > 100) {
      newErrors.title = "Title cannot be more than 100 characters";
      valid = false;
    }

    if (!text.trim()) {
      newErrors.text = "Question text cannot be empty.";
      valid = false;
    }

    const tagList = tags.split(/\s+/).filter(Boolean);
    if (tagList.length > 5) {
      newErrors.tags = "Cannot have more than 5 tags";
      valid = false;
    }
    if (tagList.some((tag) => tag.length > 20)) {
      newErrors.tags = "New tag length cannot be more than 20";
      valid = false;
    }

    if (!username.trim()) {
      newErrors.username = "Username cannot be empty.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      addQuestion({
        title,
        text,
        tags: tags.split(/\s+/).filter(Boolean),
        askedBy: username,
      });
      // Reset the form fields
      setTitle("");
      setText("");
      setTags("");
      setUsername("");
      // Call the post-submit handler if provided
      if (handleQuestions) {
        handleQuestions();
      }
    }
  };

  return {
    title,
    setTitle,
    text,
    setText,
    tags,
    setTags,
    username,
    setUsername,
    errors,
    handleSubmit,
  };
};

export default useNewQuestionForm;
