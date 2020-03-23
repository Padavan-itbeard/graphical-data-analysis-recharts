import { LineChart, Line, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import ReactDOM from "react-dom";
import React from "react";

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
];
/**
 * Базовые вычисления
 * @param {Array} data - массив исходных данных
 * @param {String} name - имя ключа
 */
const basicСalculation = (data, name) => {
  // Определяем колличество элементов
  const count = data.length;
  // Расчитываем среднее значение
  const avg = data.reduce((sum, obj) => sum + obj[name], 0) / count;
  // Расчитываем дисперсию
  const disper = data.reduce((sum, obj, i) => sum + Math.pow(obj[name] - avg, 2), 0);
  // Расчитываем среднее квадратическое (стандартное или простое) отклонение
  const stddef = Math.sqrt(disper / count);
  // Ищем максимальное значение
  const max = data.reduce((max, obj) => Math.max(max, obj[name]), -Infinity);
  return {
    avg,
    stddef,
    max,
  };
}

/**
 * Определяем границы по заданию
 * @param {Array} data - массив исходных данных
 * @param {String} name - имя ключа
 */
const avgMinusStddef = (data, name) => {
  const { avg, stddef, max } = basicСalculation(data, name)
  // Расчитываем коэффициент к максимальному значению
  return (avg - stddef) / max;
}
/**
 * Определяем границы по заданию
 * @param {Array} data - массив исходных данных
 * @param {String} name - имя ключа
 */
const avgPlusStddef = (data, name) => {
  const { avg, stddef, max } = basicСalculation(data, name)
  // Расчитываем коэффициент к максимальному значению
  return (avg + stddef) / max;
}

const App = () => {
  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}>
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0%" y2="100%">
          {/* Задаем границы цветового градиента  */}
          <stop offset="0" stopColor="red" />
          <stop offset={avgMinusStddef(data, 'uv')} stopColor="red" />
          <stop offset={avgMinusStddef(data, 'uv')} stopColor="green" />
          <stop offset={avgPlusStddef(data, 'uv')} stopColor="green" />
          <stop offset={avgPlusStddef(data, 'uv')} stopColor="red" />
          <stop offset="1" stopColor="red" />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0%" y2="100%">
          <stop offset="0" stopColor="red" />
          <stop offset={avgMinusStddef(data, 'pv')} stopColor="red" />
          <stop offset={avgMinusStddef(data, 'pv')} stopColor="blue" />
          <stop offset={avgPlusStddef(data, 'pv')} stopColor="blue" />
          <stop offset={avgPlusStddef(data, 'pv')} stopColor="red" />
          <stop offset="1" stopColor="red" />
        </linearGradient>
        <linearGradient id="colorAmt" x1="0" y1="0" x2="0%" y2="100%">
          <stop offset="0" stopColor="red" />
          <stop offset={avgMinusStddef(data, 'amt')} stopColor="red" />
          <stop offset={avgMinusStddef(data, 'amt')} stopColor="yellow" />
          <stop offset={avgPlusStddef(data, 'amt')} stopColor="yellow" />
          <stop offset={avgPlusStddef(data, 'amt')} stopColor="red" />
          <stop offset="1" stopColor="red" />
        </linearGradient>
      </defs>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Line
        type="monotone"
        dataKey="uv"
        stroke="url(#colorUv)"
        strokeWidth={3}
        dot={false}
        activeDot={{ r: 5 }}
      />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="url(#colorPv)"
        strokeWidth={3}
        dot={false}
        activeDot={{ r: 5 }}
      />
      <Line
        type="monotone"
        dataKey="amt"
        stroke="url(#colorAmt)"
        strokeWidth={3}
        dot={false}
        activeDot={{ r: 5 }}
      />
      <Tooltip />
      <Legend />
    </LineChart>
  );
};

ReactDOM.render(<App />, document.getElementById("container"));
