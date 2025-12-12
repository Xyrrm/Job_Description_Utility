/*
 * Author: Refactored by Claude Code
 * Date: 2025-01-12
 * Description: Centralized theme configuration for consistent styling
 */

import { COLORS, THEME_COLORS } from "../utils/constants";

// Light theme configuration
export const lightTheme = {
  token: {
    colorPrimary: "hsl(155, 39.1%, 43.1%)",
    borderRadius: 10,
    colorBgContainer: THEME_COLORS.LIGHT.CONTAINER,
    colorText: THEME_COLORS.LIGHT.TEXT_PRIMARY,
    colorBgLayout: THEME_COLORS.LIGHT.BACKGROUND,
    colorTextDescription: THEME_COLORS.LIGHT.TEXT_SECONDARY,
    colorIcon: THEME_COLORS.LIGHT.ICON_PRIMARY,
    colorIconHover: THEME_COLORS.LIGHT.ICON_HOVER,
    colorError: "#ff4d4f",
    colorErrorBg: "#ff4d4f",
    colorErrorBorder: "#ff4d4f",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  components: {
    Form: {
      itemMarginBottom: 12,
      labelColonMarginInlineEnd: 16,
      labelFontWeight: "bold",
    },
    Button: {
      contentFontSizeLG: "18px",
      fontWeight: 600,
      borderRadius: 6,
      controlHeight: 32,
      controlHeightLG: 40,
      dangerColor: "#ff4d4f",
      colorErrorBg: "#ff4d4f",
      colorErrorBorder: "#ff4d4f",
      colorErrorHover: "#ff7875",
      colorErrorActive: "#d9363e",
      defaultBg: "transparent",
      defaultBorderColor: THEME_COLORS.LIGHT.BORDER_SECONDARY,
      defaultColor: THEME_COLORS.LIGHT.TEXT_PRIMARY,
      defaultHoverBg: THEME_COLORS.LIGHT.CONTAINER,
      defaultHoverBorderColor: COLORS.PRIMARY,
      defaultHoverColor: COLORS.PRIMARY,
    },
    Table: {
      headerBg: THEME_COLORS.LIGHT.CONTAINER,
      borderColor: THEME_COLORS.LIGHT.BORDER_SECONDARY,
      rowHoverBg: "#f0f4f2", // Light green-tinted gray for hover
      rowSelectedBg: "#e8f2ed", // Lighter green-tinted gray for selected rows
      rowSelectedHoverBg: "#f0f4f2", // Same as hover color when hovering over selected rows
    },
    Segmented: {
      itemSelectedBg: COLORS.PRIMARY,
      itemSelectedColor: COLORS.WHITE,
      trackBg: THEME_COLORS.LIGHT.SEGMENTED_BACKGROUND,
      itemColor: THEME_COLORS.LIGHT.SEGMENTED_ITEM,
      itemHoverColor: THEME_COLORS.LIGHT.SEGMENTED_ITEM_HOVER,
      itemHoverBg: THEME_COLORS.LIGHT.SEGMENTED_HOVER_BG,
      itemActiveBg: THEME_COLORS.LIGHT.SEGMENTED_ACTIVE_BG,
      motionDurationSlow: "0.15s", // Faster animation (default is 0.3s)
      motionDurationMid: "0.1s",
    },
    Select: {
      colorBgContainer: THEME_COLORS.LIGHT.CONTAINER,
      colorText: THEME_COLORS.LIGHT.TEXT_PRIMARY,
      colorTextPlaceholder: THEME_COLORS.LIGHT.TEXT_PLACEHOLDER,
      colorIcon: THEME_COLORS.LIGHT.ICON_PRIMARY,
      colorIconHover: THEME_COLORS.LIGHT.ICON_HOVER,
    },
    Input: {
      colorBgContainer: THEME_COLORS.LIGHT.CONTAINER,
      colorText: THEME_COLORS.LIGHT.TEXT_PRIMARY,
      colorTextPlaceholder: THEME_COLORS.LIGHT.TEXT_PLACEHOLDER,
      colorIcon: THEME_COLORS.LIGHT.ICON_PRIMARY,
      colorIconHover: THEME_COLORS.LIGHT.ICON_HOVER,
    },
    DatePicker: {
      colorBgContainer: THEME_COLORS.LIGHT.CONTAINER,
      colorText: THEME_COLORS.LIGHT.TEXT_PRIMARY,
      colorTextPlaceholder: THEME_COLORS.LIGHT.TEXT_PLACEHOLDER,
      colorIcon: THEME_COLORS.LIGHT.ICON_PRIMARY,
      colorIconHover: THEME_COLORS.LIGHT.ICON_HOVER,
    },
    Collapse: {
      headerBg: COLORS.PRIMARY,
      headerPadding: "16px 24px",
      contentPadding: "0px",
      borderRadiusLG: 8,
      colorText: "#ffffff",
      colorTextHeading: "#ffffff",
    },
    Modal: {
      contentBg: THEME_COLORS.LIGHT.CONTAINER,
      headerBg: THEME_COLORS.LIGHT.CONTAINER,
      titleColor: THEME_COLORS.LIGHT.TEXT_PRIMARY,
      colorText: THEME_COLORS.LIGHT.TEXT_PRIMARY,
      colorTextDescription: THEME_COLORS.LIGHT.TEXT_SECONDARY,
      borderRadiusLG: 8,
      paddingContentHorizontalLG: 24,
    },
  },
};

// Dark theme configuration
export const darkTheme = {
  token: {
    colorPrimary: "hsl(155, 39.1%, 50%)",
    borderRadius: 10,
    colorBgContainer: THEME_COLORS.DARK.CONTAINER,
    colorText: THEME_COLORS.DARK.TEXT_PRIMARY,
    colorBgLayout: THEME_COLORS.DARK.BACKGROUND,
    colorBorder: THEME_COLORS.DARK.BORDER_PRIMARY,
    colorBgElevated: THEME_COLORS.DARK.ELEVATED,
    colorTextDescription: THEME_COLORS.DARK.TEXT_SECONDARY,
    colorIcon: THEME_COLORS.DARK.ICON_PRIMARY,
    colorIconHover: THEME_COLORS.DARK.ICON_HOVER,
    colorError: "#ff4d4f",
    colorErrorBg: "#ff4d4f",
    colorErrorBorder: "#ff4d4f",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  components: {
    Form: {
      itemMarginBottom: 12,
      labelColonMarginInlineEnd: 16,
      labelFontWeight: "bold",
    },
    Button: {
      contentFontSizeLG: "18px",
      fontWeight: 600,
      borderRadius: 6,
      controlHeight: 32,
      controlHeightLG: 40,
      dangerColor: "#ff4d4f",
      colorErrorBg: "#ff4d4f",
      colorErrorBorder: "#ff4d4f",
      colorErrorHover: "#ff7875",
      colorErrorActive: "#d9363e",
      defaultBg: "transparent",
      defaultBorderColor: THEME_COLORS.DARK.BORDER_PRIMARY,
      defaultColor: THEME_COLORS.DARK.TEXT_PRIMARY,
      defaultHoverBg: THEME_COLORS.DARK.ELEVATED,
      defaultHoverBorderColor: COLORS.PRIMARY,
      defaultHoverColor: COLORS.PRIMARY,
    },
    Table: {
      headerBg: THEME_COLORS.DARK.ELEVATED,
      borderColor: THEME_COLORS.DARK.BORDER_PRIMARY,
      rowHoverBg: "#2a2e2b", // Dark green-tinted gray for hover
      rowSelectedBg: "#243328", // Darker green-tinted gray for selected rows
      rowSelectedHoverBg: "#2a2e2b", // Same as hover color when hovering over selected rows
      colorText: THEME_COLORS.DARK.TEXT_PRIMARY,
    },
    Segmented: {
      itemSelectedBg: COLORS.PRIMARY,
      itemSelectedColor: COLORS.WHITE,
      trackBg: THEME_COLORS.DARK.SEGMENTED_BACKGROUND,
      itemColor: THEME_COLORS.DARK.SEGMENTED_ITEM,
      itemHoverColor: THEME_COLORS.DARK.SEGMENTED_ITEM_HOVER,
      itemHoverBg: THEME_COLORS.DARK.SEGMENTED_HOVER_BG,
      itemActiveBg: THEME_COLORS.DARK.SEGMENTED_ACTIVE_BG,
      motionDurationSlow: "0.15s", // Faster animation (default is 0.3s)
      motionDurationMid: "0.1s",
    },
    Input: {
      colorBgContainer: THEME_COLORS.DARK.ELEVATED,
      colorText: THEME_COLORS.DARK.TEXT_PRIMARY,
      colorTextPlaceholder: THEME_COLORS.DARK.TEXT_PLACEHOLDER,
      colorIcon: THEME_COLORS.DARK.ICON_PRIMARY,
      colorIconHover: THEME_COLORS.DARK.ICON_HOVER,
    },
    Select: {
      colorBgContainer: THEME_COLORS.DARK.ELEVATED,
      colorText: THEME_COLORS.DARK.TEXT_PRIMARY,
      colorTextPlaceholder: THEME_COLORS.DARK.TEXT_PLACEHOLDER,
      colorIcon: THEME_COLORS.DARK.ICON_PRIMARY,
      colorIconHover: THEME_COLORS.DARK.ICON_HOVER,
    },
    DatePicker: {
      colorBgContainer: THEME_COLORS.DARK.ELEVATED,
      colorText: THEME_COLORS.DARK.TEXT_PRIMARY,
      colorTextPlaceholder: THEME_COLORS.DARK.TEXT_PLACEHOLDER,
      colorIcon: THEME_COLORS.DARK.ICON_PRIMARY,
      colorIconHover: THEME_COLORS.DARK.ICON_HOVER,
      colorTextDisabled: THEME_COLORS.DARK.TEXT_DISABLED,
      colorBorderSecondary: THEME_COLORS.DARK.BORDER_SECONDARY,
      addonBg: THEME_COLORS.DARK.ELEVATED,
    },
    Collapse: {
      headerBg: COLORS.PRIMARY,
      headerPadding: "16px 24px",
      contentPadding: "0px",
      borderRadiusLG: 8,
      colorText: "#ffffff",
      colorTextHeading: "#ffffff",
    },
    Modal: {
      contentBg: THEME_COLORS.DARK.CONTAINER,
      headerBg: THEME_COLORS.DARK.CONTAINER,
      titleColor: THEME_COLORS.DARK.TEXT_PRIMARY,
      colorText: THEME_COLORS.DARK.TEXT_PRIMARY,
      colorTextDescription: THEME_COLORS.DARK.TEXT_SECONDARY,
      colorBgMask: "rgba(0, 0, 0, 0.6)",
      borderRadiusLG: 8,
      paddingContentHorizontalLG: 24,
    },
  },
};

// Default to light theme for backward compatibility
export const antdTheme = lightTheme;

// CSS-in-JS styles for Fluent UI components (theme-aware)
export const getFluentStyles = (isDark = false) => ({
  // Loading container
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
    backgroundColor: isDark ? THEME_COLORS.DARK.BACKGROUND : THEME_COLORS.LIGHT.BACKGROUND,
  },

  // No data message
  noDataMessage: {
    textAlign: "center",
    padding: "40px 20px",
    color: isDark ? THEME_COLORS.DARK.TEXT_SECONDARY : THEME_COLORS.LIGHT.TEXT_SECONDARY,
    fontSize: "16px",
    lineHeight: "1.5",
  },

  // Error message
  errorMessage: {
    textAlign: "center",
    padding: "40px 20px",
    color: isDark ? "#ff7875" : "#ff4d4f",
    fontSize: "16px",
    backgroundColor: isDark ? "#2c1414" : "#fff2f0",
    border: isDark ? "1px solid #5a2d2d" : "1px solid #ffccc7",
    borderRadius: "6px",
    margin: "20px 0",
  },
});

// Default light theme styles for backward compatibility
export const fluentStyles = getFluentStyles(false);
