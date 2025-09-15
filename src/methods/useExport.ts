/* eslint-disable @typescript-eslint/no-explicit-any */

import * as XLSX from 'xlsx';

export const useExportFileCsv = (dataJson: any, fileName: string) => {
  const json = dataJson;
  const header = Object.keys(json[0]);
  const rows = json.map((obj: any) => header.map((key) => obj[key]));

  const fileType = fileName.split('.')[1];
  const csv = [header.join(','), ...rows.map((row: any) => row.join(','))].join('\n');
  const blob = new Blob([csv], { type: `text/${fileType}` });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
};

export const useExportFileXls = (jsonData: any, fileName: string) => {
  const worksheet: any = XLSX.utils.json_to_sheet(jsonData);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

  const range = XLSX.utils.decode_range(worksheet['!ref']);
  for (let C = range.s.c; C <= range.e.c; ++C) {
    let maxWidth = 10;
    for (let R = range.s.r; R <= range.e.r; ++R) {
      const cell = worksheet[XLSX.utils.encode_cell({ c: C, r: R })];
      if (cell && cell.v) {
        const cellWidth = cell.v.toString().length;
        maxWidth = Math.max(maxWidth, cellWidth);
      }
    }
    worksheet['!cols'] = worksheet['!cols'] || [];
    worksheet['!cols'][C] = { wpx: maxWidth * 10 };
  }

  const workbookOut = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
  const blob = new Blob([s2ab(workbookOut)], { type: 'application/octet-stream' });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
};

const s2ab = (s: any) => {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xff;
  }
  return buf;
};
