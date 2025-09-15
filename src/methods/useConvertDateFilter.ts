/*
 @Params:
 dateString: String
 DD/MM/YYYY
*/

const convertDate = (dateString: string) => {
  const parts = dateString.split('/');
  const day = parts[0];
  const month = parts[1];
  const year = parts[2];
  const mmddyyyy = `${month}/${day}/${year}`;
  return mmddyyyy;
};

const useConvertDate = (dateString: string, type: 'from' | 'to') => {
  const date = convertDate(dateString);

  if (type == 'from') {
    return Date.parse(date) / 1000 + 25200;
  } else {
    return Date.parse(date) / 1000 + 25200 + 86399;
  }
};

export default useConvertDate;
