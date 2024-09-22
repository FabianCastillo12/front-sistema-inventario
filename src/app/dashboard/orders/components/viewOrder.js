import React, { useRef } from "react";
import { useFormats } from "@/hooks/useFormats";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ViewOrderPdf from "./viewOrderPdf";

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
    <div className="fixed inset-0 flex flex-col items-center justify-start bg-gray-800 bg-opacity-50 text-black z-50 ">
      <div className="bg-white p-6 rounded-lg w-11/12 overflow-y-auto mt-4">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center">
            <i className="fas fa-bars mr-2"></i>
            <h2 className="font-medium mr-2">
              ID del Pedido: <span className="font-bold">{formData.id}</span>
            </h2>
          </div>
          <div className="flex items-center">
            <i className="fas fa-bars mr-2"></i>
            <h2 className="font-medium mr-2">
              Fecha del Pedido:
              <span className="font-bold"> {formData.fecha}</span>
            </h2>
          </div>

          <div className="flex items-center">
            <i className="fas fa-bars mr-2"></i>
            <h2 className="font-medium mr-2">
              Estado del Pedido:{" "}
              <span className="font-bold">{formData.estado}</span>
            </h2>
          </div>
        </div>

        <div className="py-4">
          <div className="font-medium mb-2">Cliente:</div>
          <span className="font-bold">{formData.cliente}</span>
        </div>
        <div className="py-4">
          <div className="font-medium mb-2">Email:</div>
          <span className="font-bold">{formData.email}</span>
        </div>
        <div className="py-4">
          <div className="font-medium mb-2">Teléfono:</div>
          <span className="font-bold">{formData.telefono}</span>
        </div>
        <div className="py-4">
          <div className="font-medium mb-2">Dirección:</div>
          <span className="font-bold">{formData.direccion}</span>
        </div>

        <div className="flex border-b mb-4">
          <div className="px-4 py-2 cursor-pointer border-b-2 border-blue-500 text-blue-500 font-medium">
            Líneas del pedido
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <h3 className="text-lg font-medium mb-4">Productos</h3>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-[#05023c]">
              <tr>
                <th className="py-2 px-4 border-b text-white">ID</th>
                <th className="py-2 px-4 border-b text-white">Nombre</th>
                <th className="py-2 px-4 border-b text-white">Descripción</th>
                <th className="py-2 px-4 border-b text-white">Cantidad</th>
                <th className="py-2 px-4 border-b text-white">
                  Precio Unitario
                </th>
                <th className="py-2 px-4 border-b text-white">Impuestos</th>
                <th className="py-2 px-4 border-b text-white">Subtotal</th>
              </tr>
            </thead>
            <tbody className="text-black text-center">
              {formData.detallePedidos.map((detalle, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">
                    {detalle.producto.nombre}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {detalle.producto.categoria.descripcion}
                  </td>
                  <td className="py-2 px-4 border-b">{detalle.cantidad}</td>
                  <td className="py-2 px-4 border-b">
                    {currencyFormatter.format(detalle.producto.precio)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {currencyFormatter.format(
                      detalle.producto.precio * 0.18 * detalle.cantidad
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {currencyFormatter.format(detalle.subTotal)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <div className="flex flex-col items-end">
            <div className="flex items-center mb-2">
              <span className="font-medium text-gray-700 mr-2">
                Base imponible:
              </span>
              <span className="font-bold">
                {currencyFormatter.format(
                  formData.total - formData.total * 0.18
                )}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <span className="font-medium text-gray-700 mr-2">IGV:</span>
              <span className="font-bold">
                {currencyFormatter.format(formData.total * 0.18)}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-gray-700 mr-2">Total:</span>
              <span className="text-xl font-bold">
                {currencyFormatter.format(formData.total)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-gray-200 flex justify-end gap-5">
        <div className="flex justify-end mb-4">
          <PDFDownloadLink
            document={<ViewOrderPdf formData={formData} />}
            fileName={nombrePedido}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" // Estilos de Tailwind CSS
          >
            {({ loading }) => (loading ? "Generando PDF..." : "Descargar PDF")}
          </PDFDownloadLink>
        </div>
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsViewModalOpen(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderModal;
