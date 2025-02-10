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

const Pagination = ({ pageNum, qSize, search, title, setQuestionPage }: PaginationProps) => {

    return (
        <div>
            <button className="pagination-button next-btn">
                Next
            </button>
            <button className="pagination-button prev-btn">
                Prev
            </button>
        </div>
    );
};

export default Pagination;