import React from "react";

const StockList = ({ stock, onEdit }) => {
  return (
    <table className="min-w-full bg-white border-collapse text-black">
      <thead>
        <tr className="bg-black text-white">
          <th className="p-2 font-bold text-left">ID</th>
          <th className="p-2 font-bold text-left">Nombre</th>
          <th className="p-2 font-bold text-left">Cantidad</th>
          <th className="p-2 font-bold text-left">Precio</th>
          <th className="p-2 font-bold text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {stock &&
          stock.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-2 text-left">{item.id}</td>
              <td className="p-2 text-left">{item.nombre}</td>
              <td className="p-2 text-left">{item.cantidadStock}</td>
              <td className="p-2 text-left">
                {item.precio ? parseFloat(item.precio).toFixed(2) : "N/A"}
              </td>
              <td className="p-2 text-left">
                <button
                  onClick={() => onEdit(item)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default StockList;
