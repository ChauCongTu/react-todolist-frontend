import { format } from 'date-fns';

export const displayTime = (timestamp: number): string => {
  return format(new Date(timestamp * 1000), 'HH:mm dd/MM/yyyy');
};