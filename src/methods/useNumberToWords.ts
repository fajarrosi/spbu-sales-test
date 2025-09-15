export default function translateNumberToWords(num: number): string {
  const units = ['', 'Ribu', 'Juta', 'Miliar', 'Triliun'];
  const belowTwenty = [
    'Nol',
    'Satu',
    'Dua',
    'Tiga',
    'Empat',
    'Lima',
    'Enam',
    'Tujuh',
    'Delapan',
    'Sembilan',
    'Sepuluh',
    'Sebelas',
    'Dua Belas',
    'Tiga Belas',
    'Empat Belas',
    'Lima Belas',
    'Enam Belas',
    'Tujuh Belas',
    'Delapan Belas',
    'Sembilan Belas',
  ];
  const tens = [
    '',
    '',
    'Dua Puluh',
    'Tiga Puluh',
    'Empat Puluh',
    'Lima Puluh',
    'Enam Puluh',
    'Tujuh Puluh',
    'Delapan Puluh',
    'Sembilan Puluh',
  ];

  if (num === 0) return 'Nol';

  function convertBelowThousand(num: number): string {
    let str = '';
    if (num >= 100) {
      str += belowTwenty[Math.floor(num / 100)] + ' Ratus ';
      num %= 100;
    }
    if (num >= 20) {
      str += tens[Math.floor(num / 10)] + ' ';
      num %= 10;
    }
    if (num > 0) {
      str += belowTwenty[num] + ' ';
    }
    return str.trim();
  }

  let words = '';
  let unitIndex = 0;

  while (num > 0) {
    const chunk = num % 1000;
    if (chunk !== 0) {
      const numWord = convertBelowThousand(chunk) + ' ' + units[unitIndex] + ' ' + words;
      words = numWord.replace('Satu Ratus', 'Seratus');
    }
    num = Math.floor(num / 1000);
    unitIndex++;
  }

  return words.trim();
}
