import { useCallback } from "react";

/**
 * Custom hook that returns an onKeyDown handler.
 * The handler calls the provided callback when the pressed key is Enter or Space.
 *
 * @param handler - The function to call when the key is pressed.
 * @returns An onKeyDown event handler.
 */
const useAccessibleClick = (handler: () => void) => {
  return useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handler();
      }
    },
    [handler]
  );
};

export default useAccessibleClick;
