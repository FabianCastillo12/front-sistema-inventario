import React from "react";
import { IoTrendingUp } from "react-icons/io5";

export default function ItemsHome({ venta }) {
  const { fecha_pedido, total, detallePedidos, estado, id } = venta;
  const detalleCount = detallePedidos.length;
  const fechaFormateada = new Date(fecha_pedido).toLocaleDateString('es-ES', {
    weekday: 'long', 
    day: 'numeric',  
    month: 'short',    
  });
  
  const horaFormateada = new Date(fecha_pedido).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-[#171821] p-4 w-full rounded-md shadow-sm md:max-w-[150px] lg:min-w-[200px] lg:max-w-[250px]">
      <div className="flex items-center gap-2">
        <IoTrendingUp size={25} color="#FEB95A" />
        <div>
          <p className="text-xs text-white mt-2">
            ID del Pedido: {id}
          </p>
          <h4 className="text-white font-semibold my-4 text-xl">S/.{total.toFixed(2)}</h4>
          <h5 className="text-white text-xs font-semibold">Fecha: {fechaFormateada}</h5>
          <h5 className="text-white text-xs font-semibold">Hora: {horaFormateada}</h5>
          <p className="text-[#FEB95A] text-xs font-semibold">
            {detalleCount} {detalleCount > 1 ? "Artículos" : "Artículo"} en total
          </p>
          <p className={`text-xs font-semibold ${estado === "Registrado" ? "text-green-500" : "text-red-500"}`}>
            Estado: {estado}
          </p>
          
        </div>
      </div>
    </div>
  );
}
