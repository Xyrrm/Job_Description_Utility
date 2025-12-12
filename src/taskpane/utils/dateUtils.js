/*
 * Author: Refactored by Claude Code
 * Date: 2025-01-12
 * Description: Date utility functions
 */

/* global console */

/**
 * Formats a date object (including Ant Design date picker format) to MM/DD/YYYY
 * @param {Object|Date|null} dateValue - Date value to format
 * @returns {string} Formatted date string
 */
export const formatDate = (dateValue) => {
  if (!dateValue) {
    return new Date().toLocaleDateString();
  }

  // Handle Ant Design DatePicker format
  if (dateValue && typeof dateValue === "object" && dateValue["$M"] !== undefined) {
    const month = dateValue["$M"] + 1; // Month is 0-based
    const day = dateValue["$D"];
    const year = dateValue["$y"];
    return `${month}/${day}/${year}`;
  }

  // Handle standard Date object
  if (dateValue instanceof Date) {
    return dateValue.toLocaleDateString();
  }

  // Handle string dates
  if (typeof dateValue === "string") {
    try {
      return new Date(dateValue).toLocaleDateString();
    } catch {
      console.warn("Invalid date string:", dateValue);
      return new Date().toLocaleDateString();
    }
  }

  return new Date().toLocaleDateString();
};

/**
 * Generates a timestamp for file naming
 * @returns {string} ISO timestamp
 */
export const generateTimestamp = () => {
  return new Date().toISOString();
};

/**
 * Formats current date for document footers
 * @returns {string} Formatted date string
 */
export const getCurrentDateForFooter = () => {
  return new Date().toLocaleDateString();
};
