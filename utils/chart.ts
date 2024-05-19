import * as d3 from 'd3';

export type LineChartData = {
  date: Date;
  value: number;
}[];

export const generateLineChart = ({
  data,
  width,
  height,
  minDate,
  maxDate,
}: {
  data: LineChartData;
  width: number;
  height: number;
  minDate: string;
  maxDate: string;
}) => {
  const min = Math.min(...data.map((d) => d.value));
  const max = Math.max(...data.map((d) => d.value));

  const y = d3.scaleLinear().domain([min, max]).range([0, height]);

  const x = d3
    .scaleTime()
    .domain([new Date(minDate), new Date(maxDate)])
    .range([10, width - 10]);

  const curvedLine = d3
    .line<(typeof data)[number]>()
    .x((d) => x(new Date(d.date)))
    .y((d) => y(d.value))
    .curve(d3.curveMonotoneX)(data);

  return curvedLine;
};

