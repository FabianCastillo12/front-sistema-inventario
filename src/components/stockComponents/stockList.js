import React from 'react';

const StockList = ({ stock, onEdit }) => {
  return (
    <table className="min-w-full bg-white border-collapse block md:table text-black">
      <thead className="block md:table-header-group">
        <tr className="border border-grey-500 md:border-none block md:table-row">
          <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">ID</th>
          <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Nombre</th>
          <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Cantidad</th>
          <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Precio</th>
          <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Acciones</th>
        </tr>
      </thead>
      <tbody className="block md:table-row-group text-black">
        {stock&& stock.map(item => (
          <tr key={item.id} className="bg-white border border-grey-500 md:border-none block md:table-row">
            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">{item.id}</td>
            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">{item.nombre}</td>
            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">{item.catidadStock}</td>
            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">  {item.precio ? 
    parseFloat(item.precio).toFixed(2) 
    : "N/A"}  </td>
            <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
              <button
                onClick={() => onEdit(item)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
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