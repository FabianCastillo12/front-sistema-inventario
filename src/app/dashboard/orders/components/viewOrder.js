import React from "react";
import { useFormats } from "@/hooks/useFormats";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ViewOrderPdf from "./viewOrderPdf";

const TruncateWithTooltip = ({ text, maxLength = 20, tooltipPosition = "top" }) => {
  const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  
  const tooltipClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2"
  };
  
  return (
    <div className="relative group">
      <div className="text-sm text-gray-300 truncate">
        {truncatedText}
      </div>
      {text.length > maxLength && (
        <div className={`absolute z-50 invisible group-hover:visible bg-gray-800 text-white text-xs rounded p-2 w-max max-w-xs break-words left-0 ${tooltipClasses[tooltipPosition]}`}>
          {text}
        </div>
      )}
    </div>
  );
};

const ViewOrderModal = ({ setIsViewModalOpen, formDataView }) => {
  const { formatearFechaISO, currencyFormatter } = useFormats();

  const formData = {
    id: formDataView.id,
    fecha: formatearFechaISO(formDataView.fecha_pedido),
    cliente: formDataView.cliente.nombre,
    email: formDataView.cliente.email,
    telefono: formDataView.cliente.telefono,
    direccion: formDataView.cliente.direccion,
    detallePedidos: formDataView.detallePedidos,
    total: formDataView.total,
    estado: formDataView.estado,
  };

  const nombrePedido = `Fact${formData.id}_${formData.cliente}_${formData.fecha}.pdf`;

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-800 bg-opacity-50 z-50 overflow-hidden">
      <div className="flex-grow overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="bg-[#2A2C39] p-6 rounded-lg w-11/12 mx-auto my-8 text-white shadow-xl">
          <div className="flex items-center justify-between border-b border-[#3D4059] pb-4">
            <div className="flex items-center">
              <i className="fas fa-bars mr-2 text-gray-300"></i>
              <h2 className="font-medium mr-2 text-gray-300">
                ID del Pedido: <span className="font-bold text-white">{formData.id}</span>
              </h2>
            </div>
            <div className="flex items-center">
              <i className="fas fa-calendar mr-2 text-gray-300"></i>
              <h2 className="font-medium mr-2 text-gray-300">
                Fecha del Pedido:
                <span className="font-bold text-white"> {formData.fecha}</span>
              </h2>
            </div>
            <div className="flex items-center">
              <i className="fas fa-check-circle mr-2 text-gray-300"></i>
              <h2 className="font-medium mr-2 text-gray-300">
                Estado del Pedido:{" "}
                <span className="font-bold text-white">{formData.estado}</span>
              </h2>
            </div>
          </div>

          <div className="py-4">
            <div className="font-medium mb-2 text-gray-300">Cliente:</div>
            <span className="font-bold text-white">{formData.cliente}</span>
          </div>
          <div className="py-4">
            <div className="font-medium mb-2 text-gray-300">Email:</div>
            <span className="font-bold text-white">{formData.email}</span>
          </div>
          <div className="py-4">
            <div className="font-medium mb-2 text-gray-300">Teléfono:</div>
            <span className="font-bold text-white">{formData.telefono}</span>
          </div>
          <div className="py-4">
            <div className="font-medium mb-2 text-gray-300">Dirección:</div>
            <span className="font-bold text-white">{formData.direccion}</span>
          </div>

          <div className="flex border-b border-[#3D4059] mb-4">
            <div className="px-4 py-2 cursor-pointer border-b-2 border-blue-500 text-blue-500 font-medium">
              Líneas del pedido
            </div>
          </div>

          <div className="p-4 border-t border-[#3D4059]">
            <h3 className="text-lg font-medium mb-4 text-white">Productos</h3>
            <div className="overflow-x-auto bg-[#2A2C39] rounded-lg shadow-md">
              <table className="w-full table-fixed divide-y divide-[#3D4059]">
                <thead className="bg-[#3D4059]">
                  <tr>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider w-1/12">ID</th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider w-2/12">Nombre</th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider w-3/12">Descripción</th>
                    <th scope="col" className="px-3 py-3 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider w-1/12">Cantidad</th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider w-2/12">Precio Unitario</th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider w-1/12">Impuestos</th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider w-2/12">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="bg-[#2A2C39] divide-y divide-[#3D4059]">
                  {formData.detallePedidos.map((detalle, index) => (
                    <tr key={index} className="hover:bg-[#343747] transition-colors duration-150 ease-in-out">
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-300">{index + 1}</td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <TruncateWithTooltip text={detalle.producto.nombre} maxLength={20} />
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <TruncateWithTooltip text={detalle.producto.categoria.descripcion} maxLength={30} />
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-300 text-center">{detalle.cantidad}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-300">{currencyFormatter.format(detalle.producto.precio)}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-300">{currencyFormatter.format(detalle.producto.precio * 0.18 * detalle.cantidad)}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-300">{currencyFormatter.format(detalle.subTotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <div className="text-right">
              <div className="mb-1">
                <span className="font-medium text-gray-300 mr-2">Base imponible:</span>
                <span className="font-bold text-white">{currencyFormatter.format(formData.total - formData.total * 0.18)}</span>
              </div>
              <div className="mb-1">
                <span className="font-medium text-gray-300 mr-2">IGV:</span>
                <span className="font-bold text-white">{currencyFormatter.format(formData.total * 0.18)}</span>
              </div>
              <div>
                <span className="font-medium text-gray-300 mr-2">Total:</span>
                <span className="text-xl font-bold text-white">{currencyFormatter.format(formData.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-transparent p-4 flex justify-center gap-5 w-full">
  <PDFDownloadLink
    document={<ViewOrderPdf formData={formData} />}
    fileName={nombrePedido}
    className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-2 rounded-full transition-colors duration-150 ease-in-out shadow-md"
  >
    {({ loading }) => (loading ? "Generando PDF..." : "Descargar PDF")}
  </PDFDownloadLink>
  <button
    onClick={() => setIsViewModalOpen(false)}
    className="bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white px-6 py-2 rounded-full transition-colors duration-150 ease-in-out shadow-md"
  >
    Cerrar
  </button>
</div>
    </div>
  );
};

export default ViewOrderModal;