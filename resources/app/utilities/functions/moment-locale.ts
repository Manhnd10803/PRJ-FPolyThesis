import { Moment, MomentInput } from 'moment';
//@ts-ignore
import moment from 'moment/min/moment-with-locales';
import 'moment/locale/vi';
moment.locale('vi');

export const momentVi = (date?: MomentInput): Moment => {
  return moment(date);
};
