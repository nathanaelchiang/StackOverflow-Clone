import Header from "./Header";
import Main from "./Main";
import { FakeStackOverflowProps } from "../types/types";
import { useFakeStackOverflow } from "../hooks/useFakeStackOverflow";

/**
 * The FakeStackOverflow component is the root component of the application.
 * It uses a custom hook useFakeStackOverflow to manage the application state.
 * @param param0 - The app object encapsulating the application data and operations.
 * @returns The root component of the application.
 */
const FakeStackOverflow = ({ app }: FakeStackOverflowProps) => {
  const { search, setQuestionPage, pageInstance, handleQuestions, handleTags, clickTag } = useFakeStackOverflow(app);

  return (
    <>
      <Header search={search} setQuestionPage={setQuestionPage} />
      <Main
        search={search}
        setQuestionPage={setQuestionPage}
        pageInstance={pageInstance}
        handleQuestions={handleQuestions}
        handleTags={handleTags}
        clickTag={clickTag}
      />
    </>
  );
};

export default FakeStackOverflow;
