import { useState } from "react";

/**
 * A custom hook that manages the state of the header component.
 *
 * @param search - The search query entered by the user.
 * @param setQuesitonPage - The function to set the questions page to be displayed based on the search string.
 * @returns An object containing the current search value and handler functions for input changes and key events.
 */
export const useHeader = (
  search: string,
  setQuesitonPage: (pageIndex: number, search: string, title: string) => void
) => {
  /**
   * Maintains the search query entered by the user.
   */
  const [val, setVal] = useState(search);

  /**
   * Handler called when the user presses enter to trigger a search.
   */
  const handleSearch = () => {
    console.log("Triggering search with query:", val);
    setQuesitonPage(0, val, "Search Results");
  };

  /**
   * Handler for changes in the search input field.
   * @param e - The input change event.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Input changed:", e.target.value);
    setVal(e.target.value);
  };

  /**
   * Handler for keydown events on the search input.
   * Triggers a search when the Enter key is pressed.
   * @param e - The keyboard event.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("Enter key pressed");
      handleSearch();
    }
  };

  return {
    val,
    handleInputChange,
    handleKeyDown,
    handleSearch,
  };
};
