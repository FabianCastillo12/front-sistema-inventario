"use client";
import { useStore } from "@/stores/autenticacion";
import ItemsHome from "@/app/dashboard/home/components/itemsHome";
import { LineChartHero } from "@/app/dashboard/home/components/linea";
import { BarChartExampleWithGroups } from "@/app/dashboard/home/components/barras";
import { ProgressCircleUsageExample } from "./components/progreso";
import { useReports } from "@/hooks/useReports";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { ventasHoy, cantidadPorTipoProductoSemanal } = useReports();
  const { data: session } = useSession();
  
  const user = useStore((state) => state.user);
  const ultimasVentas = ventasHoy
    .sort((a, b) => new Date(b.fecha_pedido) - new Date(a.fecha_pedido))
    .slice(0, 4);

  return (
    <div className=" grid gap-2 grid-cols-12 ">
      <div className="bg-[rgb(33,34,45)] p-5  col-span-12 lg:col-span-4  xl:col-span-5 2xl:col-span-5">
        <h4 className="text-3xl font-semibold text-white mb-3">
          Últimas Ventas
        </h4>
        <h6 className=" text-white ">Resumen de las ventas de hoy</h6>
        {ultimasVentas.length > 0 ? (
          <div className="flex justify-between gap-2 flex-wrap mt-2">
            {ultimasVentas.map((venta, index) => (
              <ItemsHome key={index} venta={venta} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-white text-xl font-semibold">
              No hay ventas registradas hoy
            </p>
          </div>
        )}
      </div>
      <div className="  bg-[#21222D]  p-5  col-span-12 lg:col-span-8  xl:col-span-7 2xl:col-span-7">
        <h4 className=" text-3xl font-semibold text-white mb-6">
          Ventas Anuales
        </h4>
        <LineChartHero />
      </div>

      <div className="  bg-[#21222D] p-5 col-span-12 lg:col-span-6  xl:col-span-3 ">
        <h4 className=" text-3xl font-semibold text-white mb-6">Reportes</h4>
        <ProgressCircleUsageExample />
      </div>
      <div className="  bg-[#21222D] p-5 col-span-12 lg:col-span-6  xl:col-span-9">
        <h4 className=" text-3xl font-semibold text-white mb-6">Reportes</h4>
        <BarChartExampleWithGroups
          cantidadPorTipoProductoSemanal={cantidadPorTipoProductoSemanal}
        />
      </div>
    </div>
  );
}
