import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/es';

import type { BasicDateFilters } from './filters';
import { capitalizeFirstLetter, capitalizeText } from './text';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.locale('es');

const timeZone = 'America/Bogota';

export const formatTransactionCardDateByFilter = ({
  dateS,
  dateFilterKey,
}: {
  dateS: string;
  dateFilterKey: (typeof BasicDateFilters)[number];
}) => {
  const date = new Date(dateS);

  const locale = 'es-CO';

  switch (dateFilterKey) {
    case 'Today':
      return date
        .toLocaleTimeString('es-CO', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })
        .toUpperCase();

    case 'Week':
      return capitalizeText(
        date.toLocaleDateString(locale, {
          weekday: 'long',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })
      );
    case 'Month':
      return capitalizeText(
        date.toLocaleDateString(locale, {
          day: 'numeric',
          weekday: 'long',
          hour: 'numeric',
          minute: 'numeric',
        })
      );
    case 'Year':
      return capitalizeText(
        date.toLocaleDateString(locale, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      );
    default:
      return date.toLocaleDateString();
  }
};

interface MonthObject {
  year: number;
  month: number;
  date: string;
  label: string;
  utcDate: string;
}

export const generateMonthObject = (currentDate: Date): MonthObject => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const label = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'short',
  }).format(currentDate);

  const dateString = `${year}-${month < 10 ? '0' + month : month}-01 00:00:00`;

  const utcDate = dayjs
    .tz(`${year}-${month}-1 00:00:00:00`, 'DD-MM-YYYY', timeZone)
    .format('YYYY-MM-DD HH:mm:ss');

  return {
    year,
    month,
    date: dateString,
    label: capitalizeFirstLetter(label),
    utcDate: utcDate,
  };
};

export function getMonthsInRange(dateRange: {
  minDate: string;
  maxDate: string;
}) {
  const { minDate, maxDate } = dateRange;

  const startDate = new Date(minDate);
  const endDate = new Date(maxDate);

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  const months: MonthObject[] = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    months.push(generateMonthObject(currentDate));
    currentDate.setDate(1);
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  if (months.length > 0) {
    months[0].utcDate = minDate;
  }

  return months;
}

export const generateMinAndMaxDateBasedOnFilters = (
  filter: (typeof BasicDateFilters)[number]
) => {
  const format = 'YYYY-MM-DD HH:mm:ss';

  let today = dayjs.utc();

  switch (filter) {
    case 'Today':
      return {
        minDate: today.startOf('day').format(format),
        maxDate: today.endOf('day').format(format),
      };

    case 'Week':
      return {
        minDate: today.startOf('week').format(format),
        maxDate: today.endOf('week').format(format),
      };

    case 'Month':
      return {
        minDate: today.startOf('month').format(format),
        maxDate: today.endOf('month').format(format),
      };

    case 'Year':
      return {
        minDate: today.startOf('year').format(format),
        maxDate: today.endOf('year').format(format),
      };
    case 'All' as any:
      return {
        minDate: undefined,
        maxDate: undefined,
      };
    default:
      return {
        minDate: today.startOf('month').format(format),
        maxDate: today.endOf('month').format(format),
      };
  }
};

export const formatDate = (date: string) => {
  const d = dayjs(date).format('dddd D MMMM YYYY HH:mm');
  return capitalizeFirstLetter(d);
};

export default dayjs;

