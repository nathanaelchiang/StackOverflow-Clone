/**
 * Calculates the time elapsed from the given date until now.
 * - For dates within a minute, returns the difference in seconds.
 * - For dates within an hour, returns the difference in minutes.
 * - For dates within a day, returns the difference in hours.
 * - For dates older than a day, returns a formatted date string.
 * If the date is invalid, returns "Invalid date".
 *
 * @param date - A Date object or a date string.
 * @returns A string representing the elapsed time in a human-readable format.
 */
export const calculateTimeElapsed = (date: Date | string): string => {
    const now = new Date();
    const givenDate = new Date(date); // Ensure it's a Date object

    if (isNaN(givenDate.getTime())) {
        return "Invalid date"; // Handle invalid dates
    }

    const diffInSeconds = Math.floor((now.getTime() - givenDate.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds} second${diffInSeconds !== 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
        const sameYear = now.getFullYear() === givenDate.getFullYear();
        if (sameYear) {
            return `${givenDate.toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
            })} at ${givenDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            })}`;
        }
        return `${givenDate.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        })} at ${givenDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })}`;
    }
};
