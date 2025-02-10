import "./index.css";
import Form from "../baseComponents/form";
import { NewAnswerProps } from "../../../types/types";

/**
 * A component to render the form for adding a new answer
 * @param param0 the props passed to the component -- the question id, the function to add the answer, and the function reset the page if the answer is added
 * @returns a form to add a new answer
 */
const NewAnswer = ({ qid, addAnswer, handleAnswer }: NewAnswerProps) => {
  
  return (
    <Form>
      <p> New Answer Form </p>
    </Form>
  );
};

export default NewAnswer;
