import type { BasicDateFilters } from './filters';
import { capitalizeFirstLetter, capitalizeText } from './text';
import * as dateFnsTz from 'date-fns-tz';
import * as dateFns from 'date-fns';
import { es } from 'date-fns/locale';

const defaultTimetimeZone = 'America/Bogota';

export const formatTransactionCardDateByFilter = ({
  dateS,
  dateFilterKey,
}: {
  dateS: string;
  dateFilterKey: (typeof BasicDateFilters)[number];
}) => {
  // const date = new Date(dateS);
  const date = dateFnsTz.toZonedTime(new Date(dateS), defaultTimetimeZone);

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
          month: 'short',
          day: '2-digit',
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

  // Formatear la etiqueta del mes (corto) usando `date-fns`
  const label = dateFns.format(currentDate, 'MMM yyyy', { locale: es });

  // Formatear la fecha en el formato YYYY-MM-DD HH:mm:ss
  const dateString = `${year}-${month < 10 ? '0' + month : month}-01 00:00:00`;

  // Convertir a UTC y formatear la fecha en UTC
  // const utcDate = format(utcToZonedTime(currentDate, defaultTimeZone), 'yyyy-MM-dd HH:mm:ss');
  const utcDate = dateFnsTz.formatInTimeZone(
    currentDate,
    defaultTimetimeZone,
    'yyyy-MM-dd HH:mm:ss',
    {
      locale: es,
    }
  );

  return {
    year,
    month,
    date: dateString,
    label: capitalizeFirstLetter(label), // Función personalizada
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
  const format = 'yyyy-MM-dd HH:mm:ss';

  // const todayTwo = dateFns.start

  let today = new Date();

  switch (filter) {
    case 'Today':
      return {
        minDate: dateFns.startOfDay(today).toJSON(),
        maxDate: dateFns.endOfDay(today).toJSON(),
      };

    case 'Week':
      return {
        minDate: dateFns.startOfWeek(today).toJSON(),
        maxDate: dateFns.endOfWeek(today).toJSON(),
      };

    case 'Month':
      return {
        minDate: dateFns.startOfMonth(today).toJSON(),
        maxDate: dateFns.endOfMonth(today).toJSON(),
      };

    case 'Year':
      return {
        minDate: dateFns.startOfYear(today).toJSON(),
        maxDate: dateFns.endOfYear(today).toJSON(),
      };
    case 'All' as any:
      return {
        minDate: undefined,
        maxDate: undefined,
      };
    default:
      return {
        minDate: dateFns.startOfMonth(today).toJSON(),
        maxDate: dateFns.endOfMonth(today).toJSON(),
      };
  }
};

export const formatDate = (date: string) => {
  const d = dateFnsTz.formatInTimeZone(
    date,
    defaultTimetimeZone,
    'EEEE d MMMM yyyy HH:mm',
    {
      locale: es,
    }
  );

  return capitalizeFirstLetter(d);
};

export const monthsList = Array.from({ length: 12 }, (_, i) =>
  dateFns.format(new Date(2024, i, 1), 'MMMM', { locale: es })
);

export const getMinAndMaxDate = (dates: string[]) => {
  const datesObject = dates.map((date) => new Date(date).getTime());

  const minDate = new Date(Math.min(...datesObject))?.toISOString();

  const maxDate = new Date(Math.max(...datesObject))?.toISOString();

  return { minDate, maxDate };
};

export const getMinAndMaxDateInMonthUTCFromLocalTime = (date: string) => {
  const minDate = dateFns.startOfMonth(new Date(date)).toJSON();

  const maxDate = dateFns.endOfMonth(new Date(date)).toJSON();

  return { minDate, maxDate };
};

