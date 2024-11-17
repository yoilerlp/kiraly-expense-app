import * as d3 from 'd3';

export type LineChartData = {
  date: Date;
  value: number;
}[];

// export const generateLineChart = ({
//   data,
//   width,
//   height,
//   minDate,
//   maxDate,
// }: {
//   data: LineChartData;
//   width: number;
//   height: number;
//   minDate: string;
//   maxDate: string;
// }) => {

//   console.log({
//     data
//   })

//   const min = Math.min(...data.map((d) => d.value));
//   const max = Math.max(...data.map((d) => d.value));

//   const y = d3.scaleLinear().domain([min, max]).range([0, height]);

//   const x = d3
//     .scaleTime()
//     .domain([new Date(minDate), new Date(maxDate)])
//     .range([10, width - 10]);

//   const curvedLine = d3
//     .line<(typeof data)[number]>()
//     .x((d) => x(new Date(d.date)))
//     .y((d) => y(d.value))
//     .curve(d3.curveCardinal.tension(0.5))(data);

//   const areaFn  = d3
//     .area<(typeof data)[number]>()
//     .x((d) => x(new Date(d.date)))
//     .y0(height)
//     .y1((d) => y(d.value))
//     .curve(d3.curveCardinal.tension(0.5))(data);

//   return {
//     line: curvedLine,
//     area: areaFn
//   };
// };

export const generateLineChart = ({
  data,
  width,
  height,
}: {
  data: LineChartData;
  width: number;
  height: number;
}) => {
  // Filtrar datos válidos y transformar fechas
  const filteredData = data
    .filter((d) => d.date && !isNaN(new Date(d.date).getTime()) && d.value > 0)
    .map((d) => ({
      date: new Date(d.date),
      value: d.value,
    }));

  const min = Math.min(...filteredData.map((d) => d.value));
  const max = Math.max(...filteredData.map((d) => d.value));

  const minDate = d3.min(filteredData, (d) => d.date) ?? new Date();
  const maxDate = d3.max(filteredData, (d) => d.date) ?? new Date();

  // Configurar la escala logarítmica para el eje Y
  const y = d3
    .scaleLog()
    .domain([Math.max(1, min), max])
    .range([height, 0]);

  // Configurar la escala para el eje X
  const x = d3.scaleTime().domain([minDate, maxDate]).range([0, width]);

  // Generar la línea curva
  const curvedLine = d3
    .line<(typeof filteredData)[number]>()
    .x((d) => x(d.date))
    .y((d) => y(d.value))
    .curve(d3.curveCardinal.tension(0.5))(filteredData);

  // Generar el área debajo de la línea
  const areaFn = d3
    .area<(typeof filteredData)[number]>()
    .x((d) => x(d.date))
    .y0(() => y(Math.max(1, min))) // Asegurar que el área comience desde un valor positivo
    .y1((d) => y(d.value))
    .curve(d3.curveCardinal.tension(0.5))(filteredData);

  return {
    line: curvedLine,
    area: areaFn,
  };
};

