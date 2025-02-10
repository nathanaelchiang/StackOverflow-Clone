import "./index.css";
import { PaginationProps } from "../../types/types";

/**
 * A component to display the pagination buttons
 * A user can press next to see the next five questions and press prev to see the previous five questions
 * The first five questions do not show the prev button 
 * and the last five questions wrap around when the next button is pressed
 * @param param0 the props for the Pagination component
 * pageNum: the start index from which the questions are to be fetched; only five questions are fetched at a time
 * qSize: the total number of questions fetched
 * search: the search query
 * title: the title of the page
 * setQuestionPage: the function to reset the pageInstance
 * @returns the pagination buttons
 */
const Pagination = ({
  pageNum,
  qSize,
  search,
  title,
  setQuestionPage,
}: PaginationProps) => {
    /**
   * Handler for the Next button.
   * Increments the starting index by 5. If the new index exceeds or equals the total number of questions,
   * wrap around back to the first page.
   */
    const handleNext = () => {
        if (!setQuestionPage) return;
        const newPageNum = pageNum + 5 >= qSize ? 0 : pageNum + 5;
        setQuestionPage(newPageNum, search || "", title);
      };
    
      /**
       * Handler for the Prev button.
       * Decrements the starting index by 5. Since the Prev button is only shown when pageNum > 0,
       * we do not need to wrap around.
       */
      const handlePrev = () => {
        if (!setQuestionPage) return;
        const newPageNum = pageNum - 5 < 0 ? 0 : pageNum - 5;
        setQuestionPage(newPageNum, search || "", title);
      };
  return (
    // Use absolute positioning and a high z-index so that the buttons are not covered.
    <div
    >
      <button className="next-btn" onClick={handleNext}>
        Next
      </button>
      {pageNum > 0 && (
        <button className="prev-btn" onClick={handlePrev}>
          Prev
        </button>
      )}
    </div>
  );
};

export default Pagination;
