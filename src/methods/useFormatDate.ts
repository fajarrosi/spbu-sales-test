import { date } from 'quasar'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export const useFormatDate = (tgl : any, format: string) => {
  if (!tgl) return ''; // Return an empty string if the date is not provided

  let dateObj;
  
  if (typeof tgl === 'string') {
     // Try parsing the string into a valid date with multiple formats
      const formats = ['YYYY-MM-DD', 'DD/MM/YYYY', 'D/M/YYYY, h:mm:ss A', 'MM-DD-YYYY', 'M/D/YYYY'];
      let parsedDate = dayjs(tgl, formats, true); // Try strict parsing for common formats

    // If strict parsing fails, attempt ISO 8601 parsing
    if (!parsedDate.isValid()) {
      parsedDate = dayjs(tgl); // Day.js will handle ISO 8601 and other native formats
    }

      if (parsedDate) {
        dateObj = parsedDate.toDate();
      } else {
        console.error('Invalid date format:', tgl);
        return '';
      }
  } else if (tgl instanceof Date) {
    dateObj = tgl; // Assume it's already a Date object
  } else {
    console.error('Invalid date type:', tgl);
    return '';
  }

  if (isNaN(dateObj.getTime())) {
    console.error('Invalid date:', tgl);
    return '';
  }


  return date.formatDate(dateObj, format, {
    months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agus', 'Sept', 'Okt', 'Nov', 'Des'],
    days: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'], // Ensure days are also provided
    daysShort: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'] // Ensure daysShort are also provided
  });
};
