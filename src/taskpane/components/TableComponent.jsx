/*
 * Author: Refactored by Claude Code (originally by Unrico Vargas Jr.)
 * Date: 2025-01-12
 * Description: Enhanced table component with better performance and memoization
 */

import React from "react";
import PropTypes from "prop-types";
import { Table, Collapse } from "antd";
import { getStyles } from "../styles/main";
import { UI_CONSTANTS } from "../utils/constants";
import { useTheme } from "../contexts/ThemeContext";

const TableComponent = React.memo(({ tableData, activeSheet, onSelectionChange, clearTrigger, isFirstSection = false }) => {
  const { isDarkMode } = useTheme();
  const styles = getStyles(isDarkMode);
  const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
  
  // Clear selections when clearTrigger changes
  React.useEffect(() => {
    if (clearTrigger) {
      setSelectedRowKeys([]);
    }
  }, [clearTrigger]);
  
  // Memoize columns to prevent recreation on each render
  const columns = React.useMemo(() => 
    tableData.headers.map((header) => ({
      title: "Description",
      dataIndex: header,
      key: header,
      width: '100%',
    })), 
    [tableData.headers]
  );

  // Memoize row selection handler
  const handleRowSelection = React.useCallback((selectedKeys, selectedRows) => {
    setSelectedRowKeys(selectedKeys);
    const formattedRows = selectedRows.map((row) => {
      // Get only the content values, excluding the React 'key' property
      const contentValues = Object.entries(row)
        .filter(([key]) => key !== 'key')
        .map(([, value]) => value)
        .filter(val => val !== undefined && val !== null);
      return contentValues.join(", ");
    });
    onSelectionChange(tableData.headers[0], formattedRows);
  }, [onSelectionChange, tableData.headers]);

  // Handle row click to toggle selection
  const handleRowClick = React.useCallback((record) => {
    const key = record.key || record[tableData.headers[0]];
    const isSelected = selectedRowKeys.includes(key);

    let newSelectedKeys;
    if (isSelected) {
      // Remove from selection
      newSelectedKeys = selectedRowKeys.filter(k => k !== key);
    } else {
      // Add to selection
      newSelectedKeys = [...selectedRowKeys, key];
    }

    // Get the new selected rows
    const newSelectedRows = tableData.rows.filter(row =>
      newSelectedKeys.includes(row.key || row[tableData.headers[0]])
    );

    setSelectedRowKeys(newSelectedKeys);
    const formattedRows = newSelectedRows.map((row) => {
      // Get only the content values, excluding the React 'key' property
      const contentValues = Object.entries(row)
        .filter(([key]) => key !== 'key')
        .map(([, value]) => value)
        .filter(val => val !== undefined && val !== null);
      return contentValues.join(", ");
    });
    onSelectionChange(tableData.headers[0], formattedRows);
  }, [selectedRowKeys, tableData.rows, tableData.headers, onSelectionChange]);
  
  // Early return if no data
  if (!tableData.rows || tableData.rows.length === 0) {
    return (
      <div style={styles.tableContainer}>
        <Collapse
          defaultActiveKey={isFirstSection ? ['1'] : []}
          size="large"
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '8px 8px 6px 6px',
            overflow: 'hidden'
          }}
          items={[{
            key: '1',
            label: (
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
                {tableData.headers[0]}
              </span>
            ),
            children: (
              <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                No data available for this section.
              </div>
            ),
            style: {
              backgroundColor: 'transparent',
              border: 'none'
            }
          }]}
        />
      </div>
    );
  }

  return (
    <div style={styles.tableContainer}>
      <Collapse
        defaultActiveKey={isFirstSection ? ['1'] : []}
        size="large"
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '8px 8px 6px 6px',
          overflow: 'hidden'
        }}
        items={[{
          key: '1',
          label: (
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
              {tableData.headers[0]}
            </span>
          ),
          children: (
            <Table
              style={styles.table}
              dataSource={tableData.rows}
              columns={columns}
              rowKey={(record) => record.key || record[tableData.headers[0]]}
              pagination={false}
              scroll={{ y: UI_CONSTANTS.TABLE_SCROLL_HEIGHT }}
              bordered={true}
              size="large"
              rowSelection={{
                type: "checkbox",
                selectedRowKeys: selectedRowKeys,
                onChange: handleRowSelection,
              }}
              onRow={(record) => ({
                onClick: () => handleRowClick(record),
                style: { cursor: 'pointer' },
              })}
            />
          ),
          style: {
            backgroundColor: 'transparent',
            border: 'none'
          }
        }]}
      />
    </div>
  );
});

TableComponent.propTypes = {
  tableData: PropTypes.shape({
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  activeSheet: PropTypes.string.isRequired,
  onSelectionChange: PropTypes.func.isRequired,
  clearTrigger: PropTypes.number,
  isFirstSection: PropTypes.bool,
};

TableComponent.displayName = 'TableComponent';

export default TableComponent;
