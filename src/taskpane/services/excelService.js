/*
 * Author: Refactored by Claude Code (originally by Unrico Vargas Jr.)
 * Date: 2025-01-12
 * Description: Enhanced Excel integration service with better error handling
 */

/* global Excel, console */

/**
 * Returns the names of all the worksheets in the workbook
 * @returns {Promise<Array>} Promise resolving to worksheet names array
 * @throws {Error} When Excel API fails
 */
export async function getWorksheets() {
  return await Excel.run(async (context) => {
    const sheets = context.workbook.worksheets;
    sheets.load("items/name");
    await context.sync();

    const worksheets = sheets.items.map((sheet) => sheet.name);

    console.log("Fetched worksheets:", worksheets);
    return worksheets;
  });
}

/**
 * Returns the data in the specified worksheet
 * @param {string} sheetName - The name of the worksheet
 * @returns {Promise<Array>} Promise resolving to array of table data objects
 * @throws {Error} When Excel API fails or sheet/table not found
 */
export async function getWorksheetData(sheetName) {
  if (!sheetName || typeof sheetName !== "string") {
    throw new Error("Invalid sheet name provided");
  }

  return await Excel.run(async (context) => {
    const sheet = context.workbook.worksheets.getItem(sheetName);
    const table = sheet.tables.getItem(`Table${sheetName}`);
    table.load("columns");
    await context.sync();

    const columns = table.columns;
    const tableDataArray = [];

    columns.load("items");

    await context.sync();

    columns.items.forEach((item, index) => {
      try {
        // Filter out empty rows and header row
        const trimmedItemValues = item.values
          .slice(1) // Remove header row
          .filter((value) => value[0] !== null && value[0] !== ""); // Remove empty rows

        if (trimmedItemValues.length > 0) {
          const itemObject = {
            headers: [item.name],
            rows: trimmedItemValues.map((value, rowIndex) => ({
              key: `${sheetName}-${index}-${rowIndex}`, // Unique key for React
              [item.name]: value[0],
            })),
          };
          tableDataArray.push(itemObject);
        }
      } catch (columnError) {
        console.warn(`Error processing column ${item.name}:`, columnError);
        // Continue processing other columns
      }
    });

    console.log(`Fetched data for sheet ${sheetName}:`, tableDataArray);
    return tableDataArray;
  });
}

/**
 * Validates if a worksheet exists
 * @param {string} sheetName - Name of the worksheet to validate
 * @returns {Promise<boolean>} Promise resolving to true if sheet exists
 */
export async function validateWorksheet(sheetName) {
  try {
    return await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getItem(sheetName);
      sheet.load("name");
      await context.sync();
      return !!sheet.name;
    });
  } catch (error) {
    console.log(`Worksheet ${sheetName} does not exist:`, error.message);
    return false;
  }
}

/**
 * Gets basic information about a table in a worksheet
 * @param {string} sheetName - Name of the worksheet
 * @param {string} tableName - Name of the table (optional, defaults to Table{sheetName})
 * @returns {Promise<Object>} Promise resolving to table information
 */
export async function getTableInfo(sheetName, tableName = null) {
  const tableNameToUse = tableName || `Table${sheetName}`;

  return await Excel.run(async (context) => {
    const sheet = context.workbook.worksheets.getItem(sheetName);
    const table = sheet.tables.getItem(tableNameToUse);

    table.load(["name", "rowCount", "columnCount"]);
    await context.sync();

    return {
      name: table.name,
      rowCount: table.rowCount,
      columnCount: table.columnCount,
      sheetName,
    };
  });
}
