/*
 * Author: Refactored by Claude Code (originally by Unrico Vargas Jr.)
 * Date: 2025-01-12
 * Description: Custom hook for document generation functionality
 */

import { useState, useCallback } from "react";
import { message } from "antd";
import { Packer } from "docx";
import { saveAs } from "file-saver";
import { DocumentCreator, common } from "../services/documentService";
import { validateRequiredFields, withErrorHandling } from "../utils/errorHandler";
import { generateTimestamp } from "../utils/dateUtils";
import { MESSAGES } from "../utils/constants";

/**
 * Custom hook for managing document generation
 * @returns {Object} Document generation state and functions
 */
export const useDocumentGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  /**
   * Validates form data before document generation
   * @param {Object} formData - Form data to validate
   * @returns {Object} Validation result
   */
  const validateFormData = useCallback((formData) => {
    const requiredFields = ["jobTitle", "department", "classification", "supervisor", "jobSummary"];
    return validateRequiredFields(formData, requiredFields);
  }, []);

  /**
   * Generates and downloads the job description document
   * @param {Object} formData - Form data
   * @param {Array} selectedData - Selected requirements data
   * @param {string} jobLevel - Current job level
   * @param {Array} universalRequirements - Universal requirements from Global worksheet
   */
  const generateDocument = useCallback(
    async (formData, selectedData, jobLevel, universalRequirements = []) => {
      // Validate form data
      const validation = validateFormData(formData);
      if (!validation.isValid) {
        message.warning(validation.message);
        return false;
      }

      // Validate selected data
      if (!selectedData || selectedData.length === 0) {
        message.warning("Please select at least one requirement from the checklist.");
        return false;
      }

      setIsGenerating(true);

      const success = await withErrorHandling(
        async () => {
          // Use provided universal requirements or fall back to hardcoded
          const requirementsToUse =
            universalRequirements.length > 0
              ? { heading: "REQUIREMENTS FOR ALL EMPLOYEES", items: universalRequirements }
              : common; // fallback to hardcoded

          const documentCreator = new DocumentCreator();
          const doc = documentCreator.create({
            common: requirementsToUse,
            sections: selectedData,
            jobLevel,
            formData,
          });

          const timestamp = generateTimestamp();
          const blob = await Packer.toBlob(doc);
          saveAs(blob, `Job_Description_${timestamp}.docx`);

          message.success(MESSAGES.SUCCESS_DOCUMENT_GENERATED);
          return true;
        },
        false,
        "generateDocument",
        MESSAGES.ERROR_DOCUMENT_GENERATION
      );

      setIsGenerating(false);
      return success;
    },
    [validateFormData]
  );

  return {
    isGenerating,
    generateDocument,
    validateFormData,
  };
};
