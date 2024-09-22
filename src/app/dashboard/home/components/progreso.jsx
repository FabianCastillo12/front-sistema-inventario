import { Card, ProgressCircle } from "@tremor/react";
import { useReports } from "@/hooks/useReports";

const valueFormatter = (number) =>
  "S/. " + new Intl.NumberFormat("us").format(number).toString();

export function ProgressCircleUsageExample() {
  const { ventas2años, pedidos30Dias } = useReports();
  const currentYear = new Date().getFullYear();

  // Calcular avance respecto al mismo mes el año anterior
  const currentMonth = new Date().toLocaleString("en-US", { month: "short" });
  const currentMonthData = ventas2años.find(
    (data) => data.date === currentMonth
  );
  const previousYearData = currentMonthData
    ? currentMonthData[currentYear - 1]
    : 0;
  const currentYearData = currentMonthData ? currentMonthData[currentYear] : 0;
  const growth = ((currentYearData / previousYearData) * 100).toFixed(0);

  // Calcular avance respecto al año anterior
  const previousYear = currentYear - 1;
  const previousYearTotal = ventas2años.reduce(
    (acc, data) => acc + data[previousYear],
    0
  );
  const currentYearTotal = ventas2años.reduce(
    (acc, data) => acc + data[currentYear],
    0
  );
  const growthTotal = ((currentYearTotal / previousYearTotal) * 100).toFixed(0);

  //pedidos 30 dias
  function contarEstadosPedidos(pedidos) {
    return pedidos.reduce(
      (acc, pedido) => {
        if (pedido.estado === "Registrado") {
          acc.registrados += 1;
        } else if (pedido.estado === "Entregado") {
          acc.entregados += 1;
        }
        return acc;
      },
      { registrados: 0, entregados: 0 }
    );
  }
  const { registrados, entregados } = contarEstadosPedidos(pedidos30Dias);
  const totalPedidos = registrados + entregados;
  const porcentajeRegistrados = (registrados / totalPedidos) * 100;
  console.log(porcentajeRegistrados);
  const porcentajeEntregados = (entregados / totalPedidos) * 100;
  console.log(porcentajeEntregados);

  return (
    <div className="flex justify-start flex-wrap  items-start gap-4">
      <div className="w-full">
        <p className=" font-mono  my-2 text-sm text-slate-500 text-white">
          Progreso del mes {currentMonth} respecto al año anterior
        </p>
        <Card className="mx-auto max-w-sm ">
          <div className="flex justify-start space-x-5 items-center">
            <ProgressCircle value={growth} size="md">
              <span className="text-s font-medium text-slate-700 text-white">
                {growth}%
              </span>
            </ProgressCircle>
            <div>
              <p className="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
                {valueFormatter(currentYearData.toFixed(0))} /{" "}
                {valueFormatter(previousYearData.toFixed(0))} ({growth}%)
              </p>
              <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Progreso mensual
              </p>
            </div>
          </div>
        </Card>
      </div>
      <div className="w-full">
        <p className=" font-mono  my-2 text-sm text-slate-500 text-white">
          Progress del año {currentYear} respecto al año anterior
        </p>
        <Card className="mx-auto max-w-sm">
          <div className="flex justify-start space-x-5 items-center">
            <ProgressCircle value={growthTotal} size="md">
              <span className="text-s font-medium text-slate-700 text-white">
                {growthTotal}%
              </span>
            </ProgressCircle>
            <div>
              <p className="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
                {valueFormatter(currentYearTotal.toFixed(0))} /{" "}
                {valueFormatter(previousYearTotal.toFixed(0))} ({growthTotal}%)
              </p>
              <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Progreso anual
              </p>
            </div>
          </div>
        </Card>
      </div>
      <div className="w-full">
        <p className=" font-mono my-2 text-sm text-slate-500 text-white">
          Pedidos en los últimos 30 días
        </p>
        <Card className="mx-auto max-w-sm">
          <div className="flex justify-center space-x-5 items-center">
            <div>
              <ProgressCircle value={100} size="md" color="indigo">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-sm font-medium text-indigo-500">
                  {totalPedidos}
                </span>
              </ProgressCircle>
              <p className="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium text-center mt-4">
                Total
              </p>
            </div>
            <div>
              <ProgressCircle
                value={porcentajeRegistrados}
                size="md"
                color="violet"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-sm font-medium text-violet-500">
                  {registrados}
                </span>
              </ProgressCircle>
              <p className="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium text-center mt-4">
                Registrados
              </p>
            </div>
            <div>
              <ProgressCircle
                value={porcentajeEntregados}
                size="md"
                color="fuchsia"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-fuchsia-100 text-sm font-medium text-fuchsia-500">
                  {entregados}
                </span>
              </ProgressCircle>
              <p className="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium text-center mt-4">
                Entregados
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
