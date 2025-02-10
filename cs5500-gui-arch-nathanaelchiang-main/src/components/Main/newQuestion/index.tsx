import Form from "../baseComponents/form";
import "./index.css";
import { NewQuestionProps } from "../../../types/types";

/**
 * A component that renders a form for adding a new question
 * @param param0 input props for the component -- functions to add the question to the model and reset the pageInstance to home
 * @returns a form for adding a new question
 */

const NewQuestion = ({ addQuestion, handleQuestions }: NewQuestionProps) => {

  return (
    <Form>
      <p> New Question Form</p>
    </Form>
  );
};

export default NewQuestion;
