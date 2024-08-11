'use client';
import { BarChart } from '@tremor/react';

const chartdata = [
  {
    name: 'Soda Limon',
    '0.5L': 890,
    '1L': 338,
    '2L': 538,
    '3L': 396,
  },
  {
    name: 'Topic 2',
    '450ml': 890,
    '1L': 338,
    '2L': 538,
    '3L': 396,
  },
  {
    name: 'Topic 3',
    '450ml': 890,
    '1L': 338,
    '2L': 538,
    '3L': 396,
  },
  {
    name: 'Topic 4',
    '450ml': 890,
    '1L': 338,
    '2L': 538,
    '3L': 396,
  },
];

const dataFormatter = (number) =>
  Intl.NumberFormat('us').format(number).toString();

export function BarChartExampleWithGroups() {
  return (
    <div className=" w-full h-auto">
      <h3 className="text-lg font-medium text-white">
        Venta Gaseosas: Semana
      </h3>
      <BarChart
        className="mt-6 h-80" 
        data={chartdata}
        index="name"
        categories={[
          '1/2L',
          '1L',
          '2L',
          '3L',
        ]}
        colors={['blue', 'teal', 'amber', 'rose', 'indigo', 'emerald']}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    </div>
  );
}