import { calculateTimeElapsed } from "./time";

/**
 * the function is used to format a given date.
 * For a question posted on Day X, 
 * the post date should appear in seconds (if posted 0 mins. ago), 
 * minutes (if posted 0 hours ago), 
 * or hours (if posted less than 24 hours ago). 
 * The displayed string should read "<Month><day> at <hh:min>"
 * after 24 hours of posting. 
 * Date should be displayed as "<Month><day>, <year> at <hh:min>"
 * if viewed after a year of posting.
 * @param date 
 * @returns {string} - formatted string which indicates the date and time of the post
 */
const getMetaData = (date: Date | string) => {
  return calculateTimeElapsed(date);
};

export { getMetaData };
