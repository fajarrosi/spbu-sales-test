/**
 * @description function untuk get image dari local
 * @param folderimg dimana folder image berada di folder assets
 * @returns img
 */
export const getImage = (folderimg: string) => {
  return new URL(`../assets/${folderimg}`, import.meta.url).href;
  // return new URL(`src/assets/${folderimg}`, window.location.origin).href;
};

/**
 * @description function untuk menjadi ribuan
 * @param val nilai yang ingin dirubah menjadi ribuan
 * @returns string ribuan format
 */
export const formatRibuan = (val: number) => {
  const string = String(val);
  return string.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

/**
   * @description Membuat string query dari objek query yang diberikan.
   * @param {Record<string, any>} query - Objek query yang akan dikonversi menjadi string query.
   * @returns {string} String query yang dihasilkan. Jika objek query tidak diberikan atau kosong, mengembalikan string kosong.
   * // Example usage:
    query = {
      limit: 10,
      page: 1,
      sup_id: ["1", "2"],
      search: 'example'
    };
    Output: "?limit=10&page=1&sup_id=1&sup_id=2&search=example"
   */
export const queryBuilder = (query: Record<string, any>): string => {
  if (!query) return '';

  const filteredQuery = Object.fromEntries(Object.entries(query).filter(([_, value]) => value !== undefined));

  const queryStringParts: string[] = [];

  Object.entries(filteredQuery).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => {
        queryStringParts.push(`${key}=${encodeURIComponent(val)}`);
      });
    } else {
      queryStringParts.push(`${key}=${encodeURIComponent(value)}`);
    }
  });

  const queryString = queryStringParts.join('&');
  return queryString ? `?${queryString}` : '';
};

export function convertNumber(num: number) {
  return num.toString().padStart(4, '0');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformObjectToArray = (obj: any) => {
  const result = [];

  for (let i = 0; i < obj.length; i += 25) {
    result.push(obj.slice(i, i + 25));
  }

  return result;
};

export const removeRibuan = (val: string) => {
  return val.replaceAll('.', '');
};

/**
 * Check is empty object
 * @param val
 * @returns true/false
 */
export const isEmptyObject = (val: any) => {
  return typeof val === 'object' && Object.keys(val).length <= 0;
};

/**
 * Check is empty string
 * @param val
 * @returns true/false
 */
export const isEmptyString = (val: any) => {
  return typeof val === 'string' && val.replace(/\s/g, '') === '';
};

/**
 * Check is empty string
 * @param val
 * @returns true/false
 */
export const isPositiveNumber = (val: any) => {
  return typeof val === 'number' && val > 0;
};

/**
 * Check is valid input value
 * @param val
 * @returns true/false
 */
export const isValidFormValue = (val: any) => {
  if (typeof val === 'string') {
    return !isEmptyString(val);
  }

  if (typeof val === 'number') {
    return isPositiveNumber(val);
  }

  if (typeof val === 'object') {
    return !isEmptyObject(val);
  }

  return true;
};

/**
 * Parse Object to Array
 * @param obj
 * @returns Array<{key, value}>
 */
export const parseObjectToArray = (obj: any): { key: string; value: any }[] => {
  if (typeof obj !== 'object' || Array.isArray(obj)) return [];
  const arr = [];
  for (const [key, value] of Object.entries(obj)) {
    arr.push({ key, value });
  }
  return arr;
};

/**
 * Convert value to array
 * @param val - any
 * @param assign - boolean
 * @returns Array
 */
export const toArray = <T = any>(val: any, assign = false): T[] => {
  return Array.isArray(val) ? val : assign ? [val] : [];
};

/**
 * Splits an array or iterable into smaller chunks of a specified size.
 * @param arr - The input array or iterable to be chunked
 * @param size - The size of each chunk
 * @returns Array<Array<any>> - A new array containing sub-arrays (chunks) of the input, each of the specified size
 */
export function chunkArr(arr: any, size: number) {
  if (!Number.isInteger(size) || size <= 0) {
    throw new TypeError('The size parameter must be a positive integer.');
  }

  return toArray(arr).reduce((prev: any[], curr, idx) => {
    if (idx % size === 0) prev.push([]);
    prev[prev.length - 1].push(curr);

    return prev;
  }, []);
}
