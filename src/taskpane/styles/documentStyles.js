export const documentStyles = {
  default: {
    document: {
      run: {
        size: "12pt",
        color: "000000",
        font: "Calibri",
      },
    },
    heading2: {
      run: {
        bold: true,
        size: "12pt",
        color: "000000",
        font: "Calibri",
      },
      paragraph: {
        spacing: {
          after: 200,
        },
      },
    },
    paragraphStyles: [
      {
        id: "tableheaderstyle",
        name: "Table Header Style",
        basedOn: "Normal",
        next: "Normal",
        run: {
          size: "12pt",
          color: "000000",
          bold: true,
          font: "Calibri",
        },
        paragraph: {
          spacing: {
            after: 200,
          },
        },
      },
    ],
  },
};
