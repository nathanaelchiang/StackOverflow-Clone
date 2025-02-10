import React from "react";
import "./index.css";
import Form from "../baseComponents/form";
import Input from "../baseComponents/input";
import Textarea from "../baseComponents/textarea";
import { NewQuestionProps } from "../../../types/types";
import useNewQuestionForm from "../../../hooks/useNewQuestionForm";

/**
 * A component to render the form for adding a new question.
 * All non‑rendering logic is extracted into the useNewQuestionForm hook.
 * @param props - Contains addQuestion and (optionally) handleQuestions.
 * @returns The JSX for the new question form.
 */
const NewQuestion = ({ addQuestion, handleQuestions }: NewQuestionProps) => {
  const {
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
  } = useNewQuestionForm(addQuestion, handleQuestions);

  return (
    <form onSubmit={handleSubmit}>
      <Form>
        <h2>Ask a New Question</h2>
        <div className="form-group">
          <Input
            title="Title"
            id="formTitleInput"
            val={title}
            setState={setTitle}
            err={errors.title}
          />
        </div>
        <div className="form-group">
          <Textarea
            title="Question Text"
            id="formTextInput"
            val={text}
            setState={setText}
            err={errors.text}
          />
        </div>
        <div className="form-group">
          <Input
            title="Tags (separate by spaces, max 5)"
            id="formTagInput"
            val={tags}
            setState={setTags}
            err={errors.tags}
          />
        </div>
        <div className="form-group">
          <Input
            title="Username"
            id="formUsernameInput"
            val={username}
            setState={setUsername}
            err={errors.username}
          />
        </div>
        <button type="submit" className="submit-btn">
          Post Question
        </button>
      </Form>
    </form>
  );
};

export default NewQuestion;
