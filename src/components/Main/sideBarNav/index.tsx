import "./index.css";
import { SideBarNavProps } from "../../../types/types";
import useAccessibleClick from "../../../hooks/useAccessibleClick";

/**
 * The SideBarNav component renders the side bar navigation.
 * It uses the useAccessibleClick hook to attach accessible key handlers.
 *
 * @param props - The input props for the SideBarNav component.
 * @returns The SideBarNav component.
 */
const SideBarNav = ({ selected = "", handleQuestions, handleTags }: SideBarNavProps) => {
  // Get the accessible key handlers using the custom hook.
  const handleQuestionsKeyDown = useAccessibleClick(handleQuestions);
  const handleTagsKeyDown = useAccessibleClick(handleTags);

  return (
    <div id="sideBarNav" className="sideBarNav">
      <div
        id="menu_question"
        className={`menu_button ${selected === "q" ? "menu_selected" : ""}`}
        onClick={handleQuestions}
        onKeyDown={handleQuestionsKeyDown}
        role="button"
        tabIndex={0}
      >
        Questions
      </div>
      <div
        id="menu_tag"
        className={`menu_button ${selected === "t" ? "menu_selected" : ""}`}
        onClick={handleTags}
        onKeyDown={handleTagsKeyDown}
        role="button"
        tabIndex={0}
      >
        Tags
      </div>
    </div>
  );
};

export default SideBarNav;
