import React from "react";
import Link from "next/link";

export default function ClienteComponent({ clientes /*, onEditCliente, onDeleteCliente*/ }) {
  console.log(clientes);
  return (
    <>
      <table className="min-w-full bg-white border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row">
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Nombre
            </th>
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Email
            </th>
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Teléfono 
            </th>
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Dirección 
            </th>
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group text-black">
          {/* {clientes && 
            {/* clientes?.map((cliente) => ( */}
              <tr 
                // key={cliente.id} 
                className="bg-white border border-grey-500 md:border-none block md:table-row"
              >
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {/* {cliente.nombre} */}
                  Nombre de ejemplo
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {/* {cliente.email} */}
                  cliente@example.com
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {/* {cliente.telefono} */}
                  123-456-7890
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {/* {cliente.direccion} */}
                  Dirección de ejemplo
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <button
                    onClick={() => onEditCliente(cliente)} 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-1"
                  >
                    Editar 
                  </button>
                  <button
                    // onClick={() => onDeleteCliente(cliente.id)} 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                  >
                    Borrar 
                  </button>
                </td>
              </tr>
            {/* ))} */}
          {/* )} */}
        </tbody>
      </table>
    </>
  );
}