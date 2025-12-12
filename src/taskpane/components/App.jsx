/*
 * Author: Refactored by Claude Code (originally by Unrico Vargas Jr.)
 * Date: 2025-01-12
 * Description: Main component for the task pane - refactored for better performance and maintainability
 */

import * as React from "react";
import PropTypes from "prop-types";
import { Segmented, Button, ConfigProvider, Spin, Form, Modal } from "antd";
import { DeleteOutlined, FileTextOutlined } from "@ant-design/icons";
import Header from "./Header";
import FormComponent from "./FormComponent";
import TableComponent from "./TableComponent";
import { getStyles } from "../styles/main";
import { lightTheme, darkTheme, getFluentStyles } from "../styles/theme";
import { useWorksheetData } from "../hooks/useWorksheetData";
import { useDocumentGeneration } from "../hooks/useDocumentGeneration";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import { MESSAGES, THEME_COLORS, COLORS } from "../utils/constants";

const AppContent = React.memo((props) => {
  const { isDarkMode } = useTheme();
  const styles = getStyles(isDarkMode);
  const fluentStyles = getFluentStyles(isDarkMode);
  const currentTheme = isDarkMode ? darkTheme : lightTheme;
  const { title } = props;

  // Custom hooks for state management
  const {
    worksheets,
    activeSheet,
    activeSheetData,
    isLoading,
    isCurrentSheetLoading,
    handleSheetChange,
    updateSelectedData,
    getFormattedSelectedData,
    clearSelectedData,
    toolsData,
    universalRequirements,
    selectedToolsData,
    globalLoading,
    updateToolsSelection,
  } = useWorksheetData();

  const { isGenerating, generateDocument } = useDocumentGeneration();

  // Form state
  const [formData, setFormData] = React.useState({
    jobTitle: "",
    department: "",
    classification: "",
    supervisor: "",
    supervises: "",
    jobSummary: "",
    exemption: "Non-exempt",
    dateRevised: null,
  });

  // Clear trigger for table selections
  const [clearTrigger, setClearTrigger] = React.useState(0);

  // Hover state for expandable buttons
  const [isClearHovered, setIsClearHovered] = React.useState(false);
  const [isGenerateHovered, setIsGenerateHovered] = React.useState(false);

  // Form instance for programmatic control
  const [form] = Form.useForm();

  // Memoized callbacks to prevent unnecessary re-renders
  const handleSegmentChange = React.useCallback(
    async (value) => {
      await handleSheetChange(value);
    },
    [handleSheetChange]
  );

  const handleDocumentGeneration = React.useCallback(async () => {
    const jobLevelData = getFormattedSelectedData();

    // Filter out any "Tools" sections from job-level data (edge case protection)
    const filteredJobLevelData = jobLevelData.filter(
      section => !section.heading.toUpperCase().includes("TOOLS") &&
                 !section.heading.toUpperCase().includes("EQUIPMENT")
    );

    // Format Tools data from Global worksheet
    const toolsFormattedData = Object.entries(selectedToolsData).map(([heading, items]) => ({
      heading,
      items,
    }));

    // Merge filtered job level and Tools data
    const allSelectedData = [...filteredJobLevelData, ...toolsFormattedData];

    // Pass universal requirements separately
    await generateDocument(formData, allSelectedData, activeSheet, universalRequirements);
  }, [generateDocument, formData, getFormattedSelectedData, activeSheet, selectedToolsData, universalRequirements]);

  const handleFormChange = React.useCallback((changedValues, allValues) => {
    setFormData(allValues);
  }, []);

  const handleClearForm = React.useCallback(() => {
    Modal.confirm({
      title: 'Clear Form',
      content: 'Are you sure you want to clear all form data and table selections? This action cannot be undone.',
      okText: 'Yes, Clear All',
      cancelText: 'Cancel',
      okType: 'danger',
      centered: true,
      onOk: () => {
        // Clear form data
        const clearedData = {
          jobTitle: "",
          department: "",
          classification: "",
          supervisor: "",
          supervises: "",
          jobSummary: "",
          exemption: "Non-exempt",
          dateRevised: null,
        };

        setFormData(clearedData);
        form.resetFields();
        form.setFieldsValue(clearedData);

        // Clear selected table data
        clearSelectedData();

        // Trigger table selection clearing
        setClearTrigger((prev) => prev + 1);
      },
    });
  }, [clearSelectedData, form]);

  // Show loading spinner while fetching data
  if (isLoading) {
    return (
      <div style={{...styles.root, ...fluentStyles.loadingContainer}}>
        <Spin size="large" tip="Loading worksheets..." />
      </div>
    );
  }

  return (
    <ConfigProvider theme={currentTheme}>
      <div 
        style={{
          ...styles.root,
          // CSS custom properties for DatePicker icon theming
          '--ant-color-icon': isDarkMode ? THEME_COLORS.DARK.ICON_PRIMARY : THEME_COLORS.LIGHT.ICON_PRIMARY,
          '--ant-color-icon-hover': isDarkMode ? THEME_COLORS.DARK.ICON_HOVER : THEME_COLORS.LIGHT.ICON_HOVER,
        }}
      >
        <Header
          logo="assets/gbpl-header-logo.png"
          title="Gail Borden Public Library Logo"
          message={MESSAGES.WELCOME_MESSAGE}
        />

        <FormComponent formData={formData} onFormChange={handleFormChange} form={form} />

        {worksheets.length > 0 ? (
          <>
            <Segmented
              style={styles.segmentedTabs}
              options={worksheets}
              value={activeSheet}
              onChange={handleSegmentChange}
              size="large"
              block
            />

            {isCurrentSheetLoading ? (
              // Show simple loading indicator when actively loading
              <div style={{
                ...fluentStyles.noDataMessage,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '200px'
              }}>
                <Spin size="large" />
                <p style={{ marginTop: '16px', marginBottom: '0' }}>Loading worksheet data...</p>
              </div>
            ) : activeSheetData.length === 0 ? (
              // Show message when no data available
              <div style={fluentStyles.noDataMessage}>
                <p>No data available for this worksheet.</p>
              </div>
            ) : (
              // Show actual data
              activeSheetData.map((tableData, index) => (
                <div
                  key={`${activeSheet}-${index}`}
                  style={{
                    marginTop: index === 0 ? '20px' : '0px'
                  }}
                >
                  <TableComponent
                    tableData={tableData}
                    activeSheet={activeSheet}
                    onSelectionChange={updateSelectedData}
                    clearTrigger={clearTrigger}
                    isFirstSection={index === 0}
                  />
                </div>
              ))
            )}

            {/* Global Data Section - Tools (same styling as other sections) */}
            {!globalLoading && toolsData.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <TableComponent
                  tableData={{
                    headers: ["Tools & Equipment"],
                    rows: toolsData.map((tool, index) => ({
                      key: `tool-${index}`,
                      "Tools & Equipment": tool
                    }))
                  }}
                  activeSheet="Global"
                  onSelectionChange={updateToolsSelection}
                  clearTrigger={clearTrigger}
                  isFirstSection={false}
                />
              </div>
            )}

            {/* Universal Requirements Section - Read-only display */}
            {/* {universalRequirements.length > 0 && (
              <div
                style={{
                  marginTop: '30px',
                  paddingTop: '20px',
                  borderTop: `2px solid ${COLORS.PRIMARY}`,
                }}
              >
                <h3 style={{
                  marginBottom: '16px',
                  color: COLORS.PRIMARY,
                  fontWeight: 600,
                }}>
                  Requirements for All Employees
                </h3>
                <div style={{
                  backgroundColor: isDarkMode ? '#2a2a2a' : '#f9f9f9',
                  padding: '16px',
                  borderRadius: '4px',
                  border: `1px solid ${isDarkMode ? '#444' : '#e0e0e0'}`,
                }}>
                  <ul style={{
                    margin: 0,
                    paddingLeft: '20px',
                    listStyleType: 'disc',
                  }}>
                    {universalRequirements.map((req, index) => (
                      <li key={`req-${index}`} style={{
                        marginBottom: '8px',
                        color: isDarkMode ? '#ccc' : '#333',
                      }}>
                        {req}
                      </li>
                    ))}
                  </ul>
                  <p style={{
                    marginTop: '12px',
                    marginBottom: 0,
                    fontSize: '12px',
                    fontStyle: 'italic',
                    color: isDarkMode ? '#999' : '#666',
                  }}>
                    These requirements are automatically included in all job descriptions.
                  </p>
                </div>
              </div>
            )} */}
          </>
        ) : (
          <div style={fluentStyles.noDataMessage}>
            <p>No job level worksheets found.</p>
            <p>Please ensure your Excel file contains worksheets with names starting with "JL".</p>
          </div>
        )}

        {/* Floating Action Buttons - Expandable Circular */}
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            zIndex: 1000,
            alignItems: "flex-end",
          }}
        >
          {/* Clear Form Button */}
          <Button
            onClick={handleClearForm}
            onMouseEnter={() => setIsClearHovered(true)}
            onMouseLeave={() => setIsClearHovered(false)}
            icon={<DeleteOutlined style={{ fontSize: "20px" }} />}
            style={{
              borderRadius: "50px",
              height: "56px",
              width: isClearHovered ? "165px" : "56px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
              fontWeight: "600",
              fontSize: "14px",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "flex",
              alignItems: "center",
              justifyContent: isClearHovered ? "flex-start" : "center",
              padding: isClearHovered ? "0 20px" : "0",
              backgroundColor: "#ce4a4a",
              color: "white",
              border: "2px solid #ce4a4a",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {isClearHovered && <span style={{ marginLeft: "8px" }}>Clear Form</span>}
          </Button>

          {/* Generate Document Button */}
          {worksheets.length > 0 && (
            <Button
              onClick={handleDocumentGeneration}
              loading={isGenerating}
              disabled={!activeSheet || activeSheetData.length === 0}
              onMouseEnter={() => setIsGenerateHovered(true)}
              onMouseLeave={() => setIsGenerateHovered(false)}
              icon={!isGenerating && <FileTextOutlined style={{ fontSize: "20px" }} />}
              style={{
                borderRadius: "50px",
                height: "56px",
                width: isGenerateHovered ? "220px" : "56px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
                fontWeight: "600",
                fontSize: "14px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                display: "flex",
                alignItems: "center",
                justifyContent: isGenerateHovered ? "flex-start" : "center",
                padding: isGenerateHovered ? "0 20px" : "0",
                backgroundColor: "#439975",
                color: "white",
                border: "2px solid #439975",
                overflow: "hidden",
                whiteSpace: "nowrap",
                opacity: (!activeSheet || activeSheetData.length === 0) ? 0.5 : 1,
              }}
            >
              {isGenerating ? (
                "Generating..."
              ) : (
                isGenerateHovered && <span style={{ marginLeft: "8px" }}>Generate Document</span>
              )}
            </Button>
          )}
        </div>

      </div>
    </ConfigProvider>
  );
});

AppContent.propTypes = {
  title: PropTypes.string,
};

AppContent.displayName = "AppContent";

// Main App component with ThemeProvider wrapper
const App = React.memo((props) => {
  return (
    <ThemeProvider>
      <AppContent {...props} />
    </ThemeProvider>
  );
});

App.propTypes = {
  title: PropTypes.string,
};

App.displayName = "App";

export default App;
