import { parse } from 'date-fns';

export const convertTime = (dateString: string): number => {
  const dateObject = parse(dateString, 'HH:mm dd/MM/yyyy', new Date());
  return Math.floor(dateObject.getTime() / 1000);
};
