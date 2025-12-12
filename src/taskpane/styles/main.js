import { COLORS, THEME_COLORS } from "../utils/constants";

export const getStyles = (isDark = false) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: isDark ? THEME_COLORS.DARK.BACKGROUND : THEME_COLORS.LIGHT.BACKGROUND,
    padding: "30px 50px 30px 50px",
    transition: "background-color 0.3s ease",
  },
  tableContainer: {
    marginBottom: "20px",
    borderRadius: "8px",
    backgroundColor: COLORS.PRIMARY,
  },
  submitButton: {
    marginTop: "20px",
    backgroundColor: COLORS.PRIMARY,
    color: "white",
    fontWeight: "600",
    padding: "20px 40px",
  },
  tableHeader: {
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    paddingTop: "20px",
    marginBottom: "20px",
    marginLeft: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  table: {
    borderRadius: "0 0 8px 8px",
    overflow: "hidden",
  },
  segmentedTabs: {
    backgroundColor: isDark
      ? THEME_COLORS.DARK.SEGMENTED_BACKGROUND
      : THEME_COLORS.LIGHT.SEGMENTED_BACKGROUND,
    padding: "4px",
    width: "100%",
    justifyContent: "space-between",
  },
  floatingButtonContainer: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    zIndex: 1000,
  },
  floatingButton: {
    borderRadius: "50px",
    height: "56px",
    minWidth: "200px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    border: "none",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 24px",
  },
  floatingButtonPrimary: {
    backgroundColor: COLORS.PRIMARY,
    color: "white",
  },
  floatingButtonSecondary: {
    backgroundColor: "white",
    color: COLORS.PRIMARY,
    border: `2px solid ${COLORS.PRIMARY}`,
  },
});

// Default light theme styles for backward compatibility
export const styles = getStyles(false);
