import { BarChart } from "@tremor/react";
import { useReports } from "@/hooks/useReports";

const dataFormatter = (number) =>
  Intl.NumberFormat("us").format(number).toString();

export function BarChartExampleWithGroups() {
  const { cantidadPorTipoProductoSemanal } = useReports();
  console.log("producto por tipo",cantidadPorTipoProductoSemanal);
  return (
    <div className=" w-full h-auto">
      <h3 className="text-lg font-medium text-white">Venta Gaseosas: Semana</h3>
      <BarChart
        className="mt-6 h-80"
        data={cantidadPorTipoProductoSemanal}
        index="name"
        categories={["Total","450ml", "1.1L", "2L", "3L"]}
        colors={["blue", "teal", "amber", "rose", "indigo", "emerald"]}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    </div>
  );
}
