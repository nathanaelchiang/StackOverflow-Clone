import "./index.css";
import Form from "../baseComponents/form";
import Input from "../baseComponents/input";
import Textarea from "../baseComponents/textarea";
import { NewAnswerProps } from "../../../types/types";
import useNewAnswerForm from "../../../hooks/useNewAnswerForm";

/**
 * A component to render the form for adding a new answer.
 * All logic is extracted into the useNewAnswerForm hook.
 * @param props - The props passed to the component: qid, addAnswer, and optionally handleAnswer.
 * @returns A form for adding a new answer.
 */
const NewAnswer = ({ qid, addAnswer, handleAnswer }: NewAnswerProps) => {
  const { text, setText, username, setUsername, error, handleSubmit } =
    useNewAnswerForm(qid, addAnswer, handleAnswer);

  return (
    <form onSubmit={handleSubmit}>
      <Form>
        <h2>Post Your Answer</h2>
        <div className="form-group">
          <Textarea
            title="Answer Text"
            id="answerTextInput"
            val={text}
            setState={setText}
            err={error.text}
          />
        </div>
        <div className="form-group">
          <Input
            title="Username"
            id="answerUsernameInput"
            val={username}
            setState={setUsername}
            err={error.username}
          />
        </div>
        <button type="submit" className="submit-btn">
          Post Answer
        </button>
      </Form>
    </form>
  );
};

export default NewAnswer;
