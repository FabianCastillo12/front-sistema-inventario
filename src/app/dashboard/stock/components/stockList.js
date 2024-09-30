import React from "react";

const StockList = ({ stock, onEdit }) => {
  return (
    <div className="bg-[#2A2C39] rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-[#3D4059]">
        <thead>
          <tr className="bg-[#3D4059]">
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Nombre</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Cantidad</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Precio</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#3D4059]">
          {stock &&
            stock.map((item) => (
              <tr key={item.id} className="hover:bg-[#343747] transition-colors duration-150 ease-in-out">
                <td className="px-6 py-2 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">{item.id}</div>
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{item.nombre}</div>
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{item.cantidadStock}</div>
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  <div className="text-sm text-gray-300">
                    {new Intl.NumberFormat("es-PE", {
                    style: "currency",
                    currency: "PEN",
                  }).format(item.precio)}
                  </div>
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-[#4B84F0] hover:text-[#3D72D9] bg-[#2A2C39] hover:bg-[#343747] px-2 py-1 rounded-md transition-colors duration-150 ease-in-out text-sm"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;