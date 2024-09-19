import { LineChart } from "@tremor/react";
import { useReports } from "@/hooks/useReports";

const dataFormatter = (number) =>
  `${Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(number)}`;

export function LineChartHero() {
  const { ventas2años } = useReports();
  const año_pasado = new Date().getFullYear() - 1;
  const año_actual = new Date().getFullYear();
  const años = [año_pasado, año_actual];
  return (
    <LineChart
      data={ventas2años}
      index="date"
      categories={años}
      colors={["indigo", "rose"]}
      valueFormatter={dataFormatter}
      yAxisWidth={60}
      onValueChange={(v) => console.log(v)}
    />
  );
}
