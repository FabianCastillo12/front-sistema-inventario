import React from "react";

const TruncateWithTooltip = ({ text, maxLength = 20, tooltipPosition = "top" }) => {
  const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  
  const tooltipClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-1",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-1",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-1",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-1"
  };
  
  return (
    <div className="relative group inline-block">
      <div className="text-sm text-gray-300 truncate">
        {truncatedText}
      </div>
      {text.length > maxLength && (
        <div className={`absolute z-50 invisible group-hover:visible bg-gray-800 text-white text-xs rounded p-2 whitespace-nowrap ${tooltipClasses[tooltipPosition]}`}>
          {text}
        </div>
      )}
    </div>
  );
};

export default function ClienteComponent({ clientes, onEditCliente, onDeleteCliente }) {
  return (
    <div className="overflow-x-auto bg-[#2A2C39] rounded-lg shadow-md" style={{ scrollbarWidth: "none" }}>
      <table className="min-w-full divide-y divide-[#3D4059]">
        <thead className="bg-[#3D4059]">
          <tr>
            <th scope="col" className="px-6 py-2 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider w-1/5">Nombre</th>
            <th scope="col" className="px-6 py-2 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider w-1/5">Email</th>
            <th scope="col" className="px-6 py-2 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider w-1/5">Teléfono</th>
            <th scope="col" className="px-6 py-2 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider w-1/5">Dirección</th>
            <th scope="col" className="px-6 py-2 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider w-1/5">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-[#2A2C39] divide-y divide-[#3D4059]">
          {clientes && clientes.map((cliente) => (
            <tr key={cliente.id} className="hover:bg-[#343747] transition-colors duration-150 ease-in-out">
              <td className="px-6 py-2 whitespace-nowrap">
                <TruncateWithTooltip text={cliente.nombre} maxLength={20} tooltipPosition="top" />
              </td>
              <td className="px-6 py-2 whitespace-nowrap">
                <TruncateWithTooltip text={cliente.email} maxLength={25} tooltipPosition="top" />
              </td>
              <td className="px-6 py-2 whitespace-nowrap">
                <div className="text-sm text-gray-300">{cliente.telefono}</div>
              </td>
              <td className="px-6 py-2 whitespace-nowrap">
                <TruncateWithTooltip text={cliente.direccion} maxLength={30} tooltipPosition="top" />
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onEditCliente(cliente)}
                  className="text-[#4B84F0] hover:text-[#3D72D9] bg-[#2A2C39] hover:bg-[#343747] px-2 py-1 rounded-md transition-colors duration-150 ease-in-out text-sm mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDeleteCliente(cliente.id)}
                  className="text-red-400 hover:text-red-500 bg-[#2A2C39] hover:bg-[#343747] px-2 py-1 rounded-md transition-colors duration-150 ease-in-out text-sm"
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}