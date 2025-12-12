/*
 * Author: Refactored by Claude Code (originally by Unrico Vargas Jr.)
 * Date: 2025-01-12
 * Description: Custom hook for managing worksheet data and operations
 */

import { useState, useEffect, useCallback, useMemo } from "react";
import { getWorksheets, getWorksheetData } from "../services/excelService";
import { withErrorHandling } from "../utils/errorHandler";
import { UI_CONSTANTS, MESSAGES } from "../utils/constants";

/**
 * Custom hook for managing worksheet data state and operations
 * @returns {Object} Worksheet state and operations
 */
export const useWorksheetData = () => {
  const [worksheets, setWorksheets] = useState([]);
  const [activeSheet, setActiveSheet] = useState("");
  const [activeSheetData, setActiveSheetData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [sheetDataCache, setSheetDataCache] = useState({});
  const [loadingStates, setLoadingStates] = useState({});

  // Memoize filtered worksheets to prevent unnecessary recalculations
  const jobLevelSheets = useMemo(
    () => worksheets.filter((sheet) => sheet.startsWith(UI_CONSTANTS.JOB_LEVEL_PREFIX)),
    [worksheets]
  );

  /**
   * Fetch all worksheets from Excel
   */
  const fetchWorksheets = useCallback(async () => {
    setIsLoading(true);

    const sheetNames = await withErrorHandling(
      () => getWorksheets(),
      [],
      "fetchWorksheets",
      MESSAGES.ERROR_FETCH_WORKSHEETS
    );

    setWorksheets(sheetNames);

    // Auto-select first job level sheet if available
    const firstJobLevelSheet = sheetNames.find((sheet) =>
      sheet.startsWith(UI_CONSTANTS.JOB_LEVEL_PREFIX)
    );

    if (firstJobLevelSheet) {
      await handleSheetChange(firstJobLevelSheet);
    }

    setIsLoading(false);
  }, []);

  /**
   * Handle worksheet tab change with immediate switching and loading state
   * @param {string} sheetName - Name of the selected worksheet
   */
  const handleSheetChange = useCallback(
    async (sheetName) => {
      if (sheetName === activeSheet) return; // Prevent unnecessary API calls

      // Switch immediately
      setActiveSheet(sheetName);

      // Check if data is already cached
      if (sheetDataCache[sheetName]) {
        setActiveSheetData(sheetDataCache[sheetName]);
        return;
      }

      // Set loading state for this specific sheet
      setLoadingStates((prev) => ({ ...prev, [sheetName]: true }));
      setActiveSheetData([]); // Clear previous data to show loading state

      // Fetch data in background
      const data = await withErrorHandling(
        () => getWorksheetData(sheetName),
        [],
        "handleSheetChange",
        MESSAGES.ERROR_FETCH_DATA
      );

      // Cache the data
      setSheetDataCache((prev) => ({ ...prev, [sheetName]: data }));

      // Update active sheet data only if this sheet is still the active one
      setActiveSheet((currentActiveSheet) => {
        if (currentActiveSheet === sheetName) {
          setActiveSheetData(data);
        }
        return currentActiveSheet;
      });

      // Clear loading state
      setLoadingStates((prev) => ({ ...prev, [sheetName]: false }));
    },
    [activeSheet, sheetDataCache]
  );

  /**
   * Update selected data for the active sheet
   * @param {string} tableIdentifier - Table/column identifier
   * @param {Array} selectedRows - Array of selected row data
   */
  const updateSelectedData = useCallback(
    (tableIdentifier, selectedRows) => {
      setSelectedData((prev) => ({
        ...prev,
        [activeSheet]: {
          ...prev[activeSheet],
          [tableIdentifier]: selectedRows,
        },
      }));
    },
    [activeSheet]
  );

  /**
   * Get selected data formatted for document generation
   * @returns {Array} Formatted selected data
   */
  const getFormattedSelectedData = useCallback(() => {
    if (!selectedData[activeSheet]) return [];

    return Object.entries(selectedData[activeSheet]).map(([tableIdentifier, rows]) => ({
      heading: tableIdentifier,
      items: rows,
    }));
  }, [selectedData, activeSheet]);

  /**
   * Clear selected data for current sheet
   */
  const clearSelectedData = useCallback(() => {
    setSelectedData((prev) => ({
      ...prev,
      [activeSheet]: {},
    }));
  }, [activeSheet]);

  // Initialize data on component mount
  useEffect(() => {
    fetchWorksheets();
  }, [fetchWorksheets]);

  // Check if current sheet is loading
  const isCurrentSheetLoading = loadingStates[activeSheet] || false;

  return {
    // State
    worksheets: jobLevelSheets,
    activeSheet,
    activeSheetData,
    selectedData,
    isLoading,
    isCurrentSheetLoading,
    loadingStates,

    // Actions
    handleSheetChange,
    updateSelectedData,
    getFormattedSelectedData,
    clearSelectedData,
    refetchWorksheets: fetchWorksheets,
  };
};
