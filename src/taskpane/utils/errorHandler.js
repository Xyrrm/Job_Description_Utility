/*
 * Author: Refactored by Claude Code
 * Date: 2025-01-12
 * Description: Centralized error handling utilities
 */

/* global console */

import { message } from "antd";

/**
 * Handles and logs errors with user feedback
 * @param {Error} error - The error object
 * @param {string} context - Context where the error occurred
 * @param {string} userMessage - User-friendly error message
 * @param {boolean} showNotification - Whether to show notification to user
 */
export const handleError = (error, context, userMessage, showNotification = true) => {
  // Log detailed error for debugging

  console.error(`[${context}] Error:`, {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    context,
  });

  // Show user-friendly message
  if (showNotification) {
    message.error(userMessage || "An unexpected error occurred. Please try again.");
  }

  // Return a default value or null depending on context
  return null;
};

/**
 * Async wrapper that handles errors gracefully
 * @param {Function} asyncFn - Async function to execute
 * @param {*} defaultValue - Default value to return on error
 * @param {string} context - Context for error logging
 * @param {string} userMessage - User message for errors
 */
export const withErrorHandling = async (asyncFn, defaultValue, context, userMessage) => {
  try {
    return await asyncFn();
  } catch (error) {
    handleError(error, context, userMessage);
    return defaultValue;
  }
};

/**
 * Validates required form fields
 * @param {Object} formData - Form data to validate
 * @param {string[]} requiredFields - Array of required field names
 * @returns {Object} Validation result with isValid flag and missing fields
 */
export const validateRequiredFields = (formData, requiredFields) => {
  const missingFields = requiredFields.filter((field) => {
    const value = formData[field];
    return !value || (typeof value === "string" && value.trim() === "");
  });

  return {
    isValid: missingFields.length === 0,
    missingFields,
    message:
      missingFields.length > 0
        ? `Please fill in the following required fields: ${missingFields.join(", ")}`
        : null,
  };
};
