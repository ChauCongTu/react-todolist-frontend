import { parse } from 'date-fns';

export const convertTime = (dateString: string, format: null | string): number => {
  let dateObject;
  if (format === null) {
    dateObject = parse(dateString, 'HH:mm dd/MM/yyyy', new Date());
  }
  else {
    dateObject = parse(dateString, format, new Date());
  }
  return Math.floor(dateObject.getTime() / 1000);
};
