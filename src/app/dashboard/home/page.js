"use client";

import { useStore } from "@/stores/autenticacion";
import Dashboard from "../../../components/dashboardComponents/dashboard";
import { usePathname } from "next/navigation";
import { IoTrendingUp } from "react-icons/io5";
import ItemsHome from "@/components/itemHome/itemsHome";
import GraficosHome from "@/components/graficos/graficosHome";
import { LineChartHero } from "@/components/graficos/linea";
import { BarChartExampleWithGroups } from "@/components/graficos/barras";
import { ProgressCircleUsageExample } from "@/components/graficos/progreso";

export default function DashboardPage() {
  const user = useStore((state) => state.user);
  console.log(user);
  return (
    <div className=" grid gap-2 grid-cols-12 ">
      <div className="bg-[rgb(33,34,45)] p-5  col-span-12 lg:col-span-4  xl:col-span-6 2xl:col-span-8">
        <h4 className="text-3xl font-semibold text-white mb-3">
          Ventas de hoy
        </h4>
        <h6 className=" text-white ">Resumen de las ventas</h6>
        <div className=" flex  justify-start gap-3  flex-wrap mt-2">
          <ItemsHome />
          <ItemsHome />
          <ItemsHome />
          <ItemsHome />
	  
        </div>
      </div>
      <div className="  bg-[#21222D]  p-5  col-span-12 lg:col-span-8  xl:col-span-6 2xl:col-span-4" >
        <h4 className=" text-3xl font-semibold text-white mb-6">
           Reportes
        </h4>

        <LineChartHero/>

      </div>
      
      <div className="  bg-[#21222D] p-5 col-span-12 lg:col-span-6  xl:col-span-8 ">
        <h4 className=" text-3xl font-semibold text-white mb-6">
           Reportes
        </h4>
        
        <ProgressCircleUsageExample/>

      </div>
      <div className="  bg-[#21222D] p-5 col-span-12 lg:col-span-6  xl:col-span-4">
        <h4 className=" text-3xl font-semibold text-white mb-6">
           Reportes
        </h4>
        <BarChartExampleWithGroups/>
        

      </div>
		
	
	{/* <div className="flex justify-between items-center flex-wrap mt-2">
	   
	</div> */}
	{/*  */}

      {/* <Dashboard /> */}
    </div>
  );
}
