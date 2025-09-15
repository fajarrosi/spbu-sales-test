// function addPageNumbers() {
//   const totalPages = Math.ceil(document.body.scrollHeight / 1123); // A4 page height in pixels at 96 DPI
//   const pageTotalElement = document.getElementById('pageTotal');
//   if (!pageTotalElement) {
//     throw new Error('Element with ID "pageTotal" not found.');
//   }
//   pageTotalElement.innerHTML = String(totalPages);
// }

export const printContent = (elementId: string): void => {
  // Get the HTML content to be printed
  const printElement = document.getElementById(elementId);
  if (!printElement) {
    throw new Error(`Element with ID "${elementId}" not found.`);
  }

  const printHtml = printElement.innerHTML;

  let stylesHtml = '';
  document.querySelectorAll('link[rel="stylesheet"], style').forEach((node) => {
    stylesHtml += node.outerHTML;
  });

  // Create a new print window with desired dimensions and options
  const printWindow = window.open('', '', 'width=800,height=900,toolbar=0,scrollbars=0,status=0');

  // Construct the printable HTML document with collected styles and content
  const printableHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    ${stylesHtml}
    <style>
      @page {
        size: letter; 
        margin: 5mm;
      }
        @font-face {
      font-family: 'DotMatrix';
      src: url('${window.location.origin}/dotmatrix.TTF') format('truetype');
    }
        body {
        font-family: 'DotMatrix', monospace;
        letter-spacing: 2px;
      }

    </style>
  </head>
  <body>
    ${printHtml}
  </body>
  </html>`;

  // Write the printable HTML content to the print window's document
  printWindow?.document.write(printableHtml);
  printWindow?.document.close();

  // Ensure the print window is focused and ready for printing after a brief delay
  setTimeout(() => {
    printWindow?.focus();
    printWindow?.print();
    // printWindow?.close();
  }, 500);
};
