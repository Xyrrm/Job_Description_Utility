/*
 * Author: Refactored by Claude Code (originally by Unrico Vargas Jr.)
 * Date: 2025-01-12
 * Description: Enhanced document generation service with better organization and error handling
 */

/* global console, atob */

import {
  AlignmentType,
  Document,
  Footer,
  HeadingLevel,
  ImageRun,
  NumberFormat,
  Paragraph,
  PageNumber,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
  BorderStyle,
} from "docx";
import { documentStyles } from "../styles/documentStyles";
import { formatDate, getCurrentDateForFooter } from "../utils/dateUtils";
import { DOCUMENT_CONSTANTS } from "../utils/constants";
import { logoImageBase64 } from "../utils/logoBase64";

// Common requirements for all employees
export const common = {
  heading: "REQUIREMENTS FOR ALL EMPLOYEES",
  items: [
    "Ability to work effectively with staff, customers, and others, respecting confidentiality when necessary.",
    "Respect for cultural differences and ability to work with people from a wide range of diverse backgrounds.",
    "Ability to communicate clearly and use various technologies to complete work.",
    "Ability to understand and demonstrate our Culture, Mission, Vision, and Values statements.",
    "Initiative and willingness to learn new tasks and responsibilities.",
    "Updates job knowledge by participating in educational opportunities, attending scheduled meetings, and training sessions.",
    "Readily and effectively adjusts to changing ideas, routines, and work activities.",
    "Ability to prioritize and manage time efficiently and effectively.",
    "Follows established safety rules and works in a safe manner.",
    "Delivers exceptional internal and external customer service.",
  ],
};

/**
 * Document Creator class for generating job description Word documents
 */
export class DocumentCreator {
  /**
   * Creates a Word document with job description content
   * @param {Object} params - Document parameters
   * @param {Object} params.common - Common requirements
   * @param {Array} params.sections - Job-specific sections
   * @param {string} params.jobLevel - Job level (e.g., "JL1", "JL2")
   * @param {Object} params.formData - Form data from user input
   * @returns {Document} Word document object
   */
  create({ common, sections, jobLevel, formData }) {
    try {
      const formattedDateRevised = formatDate(formData.dateRevised);

      return new Document({
        styles: documentStyles,
        sections: [
          {
            properties: this.createPageProperties(),
            footers: { default: this.createFooter() },
            children: this.createDocumentContent({
              common,
              sections,
              jobLevel,
              formData,
              formattedDateRevised,
            }),
          },
        ],
      });
    } catch (error) {
      console.error("Error creating document:", error);
      throw new Error("Failed to create document structure");
    }
  }

  /**
   * Creates page properties for the document
   * @returns {Object} Page properties
   */
  createPageProperties() {
    return {
      page: {
        pageNumbers: {
          start: 1,
          formatType: NumberFormat.DECIMAL,
        },
        margin: {
          top: DOCUMENT_CONSTANTS.INCH_UNIT * DOCUMENT_CONSTANTS.PAGE_MARGINS.top,
          right: DOCUMENT_CONSTANTS.INCH_UNIT * DOCUMENT_CONSTANTS.PAGE_MARGINS.right,
          bottom: DOCUMENT_CONSTANTS.INCH_UNIT * DOCUMENT_CONSTANTS.PAGE_MARGINS.bottom,
          left: DOCUMENT_CONSTANTS.INCH_UNIT * DOCUMENT_CONSTANTS.PAGE_MARGINS.left,
        },
      },
    };
  }

  /**
   * Creates document footer
   * @returns {Footer} Footer object
   */
  createFooter() {
    return new Footer({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              children: [
                `${getCurrentDateForFooter()}\t\t\t\t\t\t\t\t\t\t\t\t\t `,
                PageNumber.CURRENT,
              ],
              size: "8pt",
              font: "Calibri",
            }),
          ],
          alignment: AlignmentType.LEFT,
        }),
      ],
    });
  }

  /**
   * Creates all document content
   * @param {Object} params - Content parameters
   * @returns {Array} Array of document elements
   */
  createDocumentContent({ common, sections, jobLevel, formData, formattedDateRevised }) {
    // Separate Tools sections from other sections
    const toolsSections = sections.filter(
      (s) =>
        s.heading.toUpperCase().includes("TOOLS") || s.heading.toUpperCase().includes("EQUIPMENT")
    );

    const jobLevelSections = sections.filter(
      (s) =>
        !s.heading.toUpperCase().includes("TOOLS") && !s.heading.toUpperCase().includes("EQUIPMENT")
    );

    return [
      // Header
      this.createLogo(),
      //this.newLine(),

      // Position Details Table
      this.createPositionDetailsTable(formData, jobLevel, formattedDateRevised),
      this.newLine(),

      // Position Summary
      this.createHeading("POSITION SUMMARY"),
      new Paragraph({
        text: formData.jobSummary || "N/A",
      }),
      this.newLine(),

      // Universal Requirements
      this.createHeading(common.heading),
      ...common.items.map((item) => this.createBullet(item)),
      this.newLine(),

      // Job-level specific sections
      ...this.createDynamicSections(jobLevelSections),

      // Tools sections (if any)
      ...this.createDynamicSections(toolsSections),

      // Footer Content
      new Paragraph({
        text: "* The scope of the job may change as necessitated by the library's operational demands.",
      }),
      this.newLine(),
      this.newLine(),
      this.newLine(),
      this.newLine(),
      this.createHeading(""),
      this.newLine(),
      this.newLine(),
      new Paragraph({
        text: "EMPLOYEE ACKNOWLEDGEMENT",
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
      }),
      this.newLine(),
      new Paragraph({
        text: "I have read and understand the essential duties, responsibilities, and essential functions of this position. I understand that this does not limit the assignment of additional duties for this position, and that the job duties and responsibilities may change as necessitated by the library's operational demands.",
      }),
      this.newLine(),
      this.newLine(),
      this.newLine(),
      this.createHeading(""),
      new Paragraph({
        text: "Employee's Signature\t\t\t\t\t\t\t\tDate",
        alignment: AlignmentType.LEFT,
      }),
    ];
  }

  /**
   * Creates header with library name (safer than image for Word compatibility)
   * @returns {Paragraph} Header paragraph
   */
  createLogo() {
    // Convert base64 string to Uint8Array for browser compatibility
    const binaryString = atob(logoImageBase64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return new Paragraph({
      children: [
        new ImageRun({
          data: bytes,
          transformation: {
            width: DOCUMENT_CONSTANTS.LOGO_DIMENSIONS.width / 6,
            height: DOCUMENT_CONSTANTS.LOGO_DIMENSIONS.height / 6,
          },
        }),
      ],
      alignment: AlignmentType.LEFT,
      spacing: {
        after: 240, // 12pt spacing after
      },
    });
  }

  /**
   * Creates position details table
   * @param {Object} formData - Form data
   * @param {string} jobLevel - Job level
   * @param {string} formattedDateRevised - Formatted revision date
   * @returns {Table} Position details table
   */
  createPositionDetailsTable(formData, jobLevel, formattedDateRevised) {
    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        // Header Row
        new TableRow({
          children: [
            this.createTableHeader("JOB TITLE", 30),
            this.createTableHeader("DEPARTMENT", 30),
            this.createTableHeader("JOB LEVEL", 15),
            this.createTableHeader("CLASSIFICATION", 25),
          ],
        }),

        // Data Row 1
        new TableRow({
          children: [
            this.createTableCell(formData.jobTitle || "N/A", 30),
            this.createTableCell(formData.department || "N/A", 30),
            this.createTableCell(jobLevel.slice(2), 15),
            this.createClassificationCell(formData),
          ],
        }),

        // Header Row 2
        new TableRow({
          children: [
            this.createTableHeader("REPORTS TO", 30),
            this.createTableHeader("SUPERVISES", 30),
            this.createTableHeader("REVISED", 40, 2),
          ],
        }),

        // Data Row 2
        new TableRow({
          children: [
            this.createTableCell(formData.supervisor || "N/A", 30),
            this.createTableCell(formData.supervises || "N/A", 30),
            this.createTableCell(formattedDateRevised, 40, 2),
          ],
        }),
      ],
    });
  }

  /**
   * Creates classification cell with exemption status
   * @param {Object} formData - Form data
   * @returns {TableCell} Classification cell
   */
  createClassificationCell(formData) {
    return new TableCell({
      children: [
        new Paragraph(formData.classification || "N/A"),
        new Paragraph(formData.exemption || "Non-exempt"),
      ],
      tableHeader: true,
      width: { size: 25, type: WidthType.PERCENTAGE },
      margins: DOCUMENT_CONSTANTS.DEFAULT_MARGINS,
    });
  }

  /**
   * Creates position summary section
   * @param {Object} formData - Form data
   * @returns {Array} Position summary elements
   */
  createPositionSummary(formData) {
    return [
      // this.createHeading("POSITION SUMMARY"),
      new Paragraph({
        text: formData.jobSummary || "N/A",
      }),
    ];
  }

  /**
   * Creates universal requirements section
   * @param {Object} common - Common requirements
   * @returns {Array} Universal requirements elements
   */
  createUniversalRequirements(common) {
    return [
      this.createHeading(common.heading),
      ...common.items.map((item) => this.createBullet(item)),
    ];
  }

  /**
   * Creates dynamic sections from selected data
   * @param {Array} sections - Selected sections
   * @returns {Array} Dynamic section elements
   */
  createDynamicSections(sections) {
    return sections.flatMap((section) => [
      this.createHeading(section.heading.toUpperCase()),
      ...section.items.flatMap((item) => this.createBulletList(item)),
      this.newLine(),
    ]);
  }

  /**
   * Creates footer content (disclaimer and acknowledgment)
   * @returns {Array} Footer content elements
   */
  createFooterContent() {
    return [
      new Paragraph({
        text: "* The scope of the job may change as necessitated by the library's operational demands.",
      }),
      this.newLine(),
      this.newLine(),
      this.newLine(),
      this.newLine(),
      this.createHeading(""),
      this.newLine(),
      this.newLine(),
      new Paragraph({
        text: "EMPLOYEE ACKNOWLEDGEMENT",
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
      }),
      this.newLine(),
      new Paragraph({
        text: "I have read and understand the essential duties, responsibilities, and essential functions of this position. I understand that this does not limit the assignment of additional duties for this position, and that the job duties and responsibilities may change as necessitated by the library's operational demands.",
      }),
      this.newLine(),
      this.newLine(),
      this.newLine(),
      this.createHeading(""),
      new Paragraph({
        text: "Employee's Signature\t\t\t\t\t\t\t\tDate",
        alignment: AlignmentType.LEFT,
      }),
    ];
  }

  // Helper Methods

  /**
   * Creates a table header cell
   * @param {string} text - Header text
   * @param {number} width - Cell width percentage
   * @param {number} columnSpan - Column span (optional)
   * @returns {TableCell} Header cell
   */
  createTableHeader(text, width, columnSpan = 1) {
    return new TableCell({
      children: [
        new Paragraph({
          children: [new TextRun({ text: text, bold: true })],
        }),
      ],
      tableHeader: true,
      width: { size: width, type: WidthType.PERCENTAGE },
      margins: DOCUMENT_CONSTANTS.DEFAULT_MARGINS,
      shading: { fill: "d9d9d9" },
      ...(columnSpan > 1 && { columnSpan }),
    });
  }

  /**
   * Creates a table data cell
   * @param {string} text - Cell text
   * @param {number} width - Cell width percentage
   * @param {number} columnSpan - Column span (optional)
   * @returns {TableCell} Data cell
   */
  createTableCell(text, width, columnSpan = 1) {
    return new TableCell({
      children: [new Paragraph(text || "N/A")],
      tableHeader: true,
      width: { size: width, type: WidthType.PERCENTAGE },
      margins: DOCUMENT_CONSTANTS.DEFAULT_MARGINS,
      ...(columnSpan > 1 && { columnSpan }),
    });
  }

  /**
   * Creates a heading paragraph
   * @param {string} text - Heading text
   * @returns {Paragraph} Heading paragraph
   */
  createHeading(text) {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_2,
      border: {
        bottom: {
          color: "000000",
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
    });
  }

  /**
   * Creates a bullet point paragraph
   * @param {string} text - Bullet text
   * @returns {Paragraph} Bullet paragraph
   */
  createBullet(text) {
    return new Paragraph({
      text: text,
      bullet: { level: 0 },
    });
  }

  /**
   * Creates nested bullet list from text with nested bullets
   * @param {string} text - Text potentially containing nested bullets
   * @returns {Array} Array of bullet paragraphs
   */
  createBulletList(text) {
    const nestedBullets = text.split("•").map((bullet) => bullet.trim());

    if (nestedBullets.length > 1) {
      const bullets = [
        new Paragraph({
          text: nestedBullets[0],
          bullet: { level: 0 },
        }),
      ];

      for (let i = 1; i < nestedBullets.length; i++) {
        if (nestedBullets[i]) {
          bullets.push(
            new Paragraph({
              text: nestedBullets[i],
              bullet: { level: 1 },
            })
          );
        }
      }

      return bullets;
    } else {
      return [
        new Paragraph({
          text: text.trim(),
          bullet: { level: 0 },
        }),
      ];
    }
  }

  /**
   * Creates a new line paragraph
   * @returns {Paragraph} Empty paragraph for spacing
   */
  newLine() {
    return new Paragraph({ text: "" });
  }
}
