/*
 * Author: Refactored by Claude Code (Originally by Unrico Vargas Jr.)
 * Date: 2025-09-12
 * Description: Centralized constants for the application
 */

// UI Constants
export const UI_CONSTANTS = {
  JOB_LEVEL_PREFIX: "JL",
  TABLE_SCROLL_HEIGHT: 400,
  DEV_SERVER_PORT: 3000,
  FORM_LABEL_SPAN: 5,
  FORM_WRAPPER_SPAN: 17,
  GLOBAL_WORKSHEET_NAME: "Common",
  TOOLS_TABLE_NAME: "TableTools",
  REQUIREMENTS_TABLE_NAME: "TableRequirements",
  TOOLS_SECTION_HEADING: "TOOLS & EQUIPMENT",
  REQUIREMENTS_SECTION_HEADING: "REQUIREMENTS FOR ALL EMPLOYEES",
};

// Colors
export const COLORS = {
  PRIMARY: "#439975",
  BACKGROUND: "#f0f0f0",
  SEGMENTED_BACKGROUND: "#e4e4e7",
  WHITE: "white",
  BLACK: "000000",
};

// Theme-specific color palettes
export const THEME_COLORS = {
  LIGHT: {
    // Background colors
    BACKGROUND: "#f0f0f0",
    CONTAINER: "white",
    ELEVATED: "#ffffff",
    SEGMENTED_BACKGROUND: "#e4e4e7",

    // Text colors
    TEXT_PRIMARY: "#262626",
    TEXT_SECONDARY: "#666666",
    TEXT_DISABLED: "#999999",
    TEXT_PLACEHOLDER: "#999999",

    // Border colors
    BORDER_PRIMARY: "#d9d9d9",
    BORDER_SECONDARY: "#f0f0f0",

    // Icon colors
    ICON_PRIMARY: "#666666",
    ICON_HOVER: "#333333",

    // Segmented control colors
    SEGMENTED_ITEM: "#595959",
    SEGMENTED_ITEM_HOVER: "#262626",
    SEGMENTED_HOVER_BG: "#f0f0f0",
    SEGMENTED_ACTIVE_BG: "#d9d9d9",
  },

  DARK: {
    // Background colors
    BACKGROUND: "#141414",
    CONTAINER: "#1f1f1f",
    ELEVATED: "#262626",
    SEGMENTED_BACKGROUND: "#262626",

    // Text colors
    TEXT_PRIMARY: "#ffffff",
    TEXT_SECONDARY: "#cccccc",
    TEXT_DISABLED: "#666666",
    TEXT_PLACEHOLDER: "#888888",

    // Border colors
    BORDER_PRIMARY: "#424242",
    BORDER_SECONDARY: "#424242",

    // Icon colors
    ICON_PRIMARY: "#cccccc",
    ICON_HOVER: "#ffffff",

    // Segmented control colors
    SEGMENTED_ITEM: "#cccccc",
    SEGMENTED_ITEM_HOVER: "#ffffff",
    SEGMENTED_HOVER_BG: "#333333",
    SEGMENTED_ACTIVE_BG: "#1a1a1a",
  },
};

// Document Generation Constants
export const DOCUMENT_CONSTANTS = {
  INCH_UNIT: 1440,
  DEFAULT_MARGINS: {
    top: 100,
    bottom: 100,
    left: 100,
    right: 100,
  },
  PAGE_MARGINS: {
    top: 0.5,
    right: 0.5,
    bottom: 0.5,
    left: 0.5,
  },
  LOGO_DIMENSIONS: {
    width: 1358,
    height: 453,
  },
};

// Messages
export const MESSAGES = {
  SUCCESS_DOCUMENT_GENERATED: "Document generated successfully!",
  ERROR_FETCH_WORKSHEETS: "Failed to fetch worksheets",
  ERROR_FETCH_DATA: "Failed to fetch worksheet data",
  ERROR_FETCH_GLOBAL: "Failed to fetch Global data",
  ERROR_DOCUMENT_GENERATION: "Failed to generate document",
  WELCOME_MESSAGE:
    "Fill out the job description details then select a job level tab to view it's corresponding checklist.",
};

// Form Default Values
export const FORM_DEFAULTS = {
  SUPERVISES_DEFAULT: "N/A",
  CLASSIFICATION_OPTIONS: [
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time", label: "Part-time" },
    { value: "Temporary", label: "Temporary" },
    { value: "Substitute", label: "Substitute" },
  ],
  EXEMPTION_OPTIONS: [
    { value: "Non-exempt", label: "Non-exempt" },
    { value: "Exempt", label: "Exempt" },
  ],
};

// Department Options for Library
export const DEPARTMENT_OPTIONS = [
  { value: "Collection Services", label: "Collection Services" },
  { value: "Customer Relations", label: "Customer Relations" },
  { value: "Library Applications", label: "Library Applications" },
  { value: "Materials Handling", label: "Materials Handling" },
  { value: "Technical Services", label: "Technical Services" },
  { value: "Administrative Services", label: "Administrative Services" },
  { value: "Finance", label: "Finance" },
  { value: "Human Resources", label: "Human Resources" },
  { value: "Volunteer Services", label: "Volunteer Services" },
  { value: "Mobile Library Services", label: "Mobile Library Services" },
  { value: "Branch Services", label: "Branch Services" },
  { value: "Community Engagement", label: "Community Engagement" },
  { value: "Facilities", label: "Facilities" },
  { value: "Information Technology", label: "Information Technology" },
  { value: "Security Services", label: "Security Services" },
  { value: "Communications & Visual Arts", label: "Communications & Visual Arts" },
  { value: "Graphic Arts", label: "Graphic Arts" },
  { value: "Exhibits & Displays", label: "Exhibits & Displays" },
  { value: "Copy Shop", label: "Copy Shop" },
  { value: "Digital Services", label: "Digital Services" },
  { value: "Hispanic Services", label: "Hispanic Services" },
  { value: "Information Services", label: "Information Services" },
  { value: "KidSpace", label: "KidSpace" },
  {
    value: "Public Programs & Meeting Room Administration",
    label: "Public Programs & Meeting Room Administration",
  },
  { value: "Studio 270", label: "Studio 270" },
];
