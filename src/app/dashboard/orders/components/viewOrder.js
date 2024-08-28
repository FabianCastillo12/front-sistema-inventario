import React, { useState } from "react";

const ViewOrderModal = ({ setIsViewModalOpen, formDataView }) => {
  const [formData, setFormData] = useState({
    id: formDataView.id,
    fecha: formDataView.fecha,
    cliente: formDataView.cliente,
    email: formDataView.email,
    telefono: formDataView.telefono,
    direccion: formDataView.direccion,
    productos: formDataView.productos || [],
    subtotal: formDataView.subtotal || 0,
    descuento: formDataView.descuento || 0,
    impuestos: formDataView.impuestos || 0,
    total: formDataView.total,
    notas: formDataView.notas,
    metodoPago: formDataView.metodoPago,
    estado: formDataView.estado,
  });

  const currencyFormatter = new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  });

  // Datos de ejemplo para productos
  const productosEjemplo = [
    { nombre: "Soda Limon", descripcion: "Gaseosa de limón", cantidad: 1, precioUnitario: 1.00, impuestos: "IGV 18%", impuestosNoIncluidos: 1.00 },
    { nombre: "Kola Tigrina", descripcion: "Gaseosa de kola", cantidad: 2, precioUnitario: 1.50, impuestos: "IGV 18%", impuestosNoIncluidos: 3.00 },
    { nombre: "Agua Vip", descripcion: "Agua mineral", cantidad: 1, precioUnitario: 0.50, impuestos: "IGV 18%", impuestosNoIncluidos: 0.50 },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-black z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-[calc(90vw-4rem)] w-full overflow-y-auto max-h-[calc(79vh-4rem)] scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100" style={{ scrollbarWidth: 'none' }}>

        {/* Encabezado */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center">
            <i className="fas fa-bars mr-2"></i>
            <h2 className="font-medium mr-2">ID del Pedido: <span className="font-bold">{formData.id}</span></h2>
          </div>
          <div className="flex items-center">
            <i className="fas fa-bars mr-2"></i>
            <h2 className="font-medium mr-2">Fecha del Pedido: <span className="font-bold">{formData.fecha}</span></h2>
          </div>

          <div className="flex items-center">
            <i className="fas fa-bars mr-2"></i>
            <h2 className="font-medium mr-2">Estado del Pedido: <span className="font-bold">{formData.estado}</span></h2>
          </div>


        </div>

        {/* Información del Cliente */}
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

        {/* Pestañas */}
        <div className="flex border-b mb-4">
          <div className="px-4 py-2 cursor-pointer border-b-2 border-blue-500 text-blue-500 font-medium">
            Líneas del pedido
          </div>
        </div>

        {/* Tabla de Productos (Adaptado de ordersTable.js) */}
        <div className="p-4 border-t border-gray-200">
          <h3 className="text-lg font-medium mb-4">Productos</h3>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-[#05023c]">
              <tr>
                <th className="py-2 px-4 border-b text-white">ID</th>
                <th className="py-2 px-4 border-b text-white">Nombre</th>
                <th className="py-2 px-4 border-b text-white">Descripción</th>
                <th className="py-2 px-4 border-b text-white">Cantidad</th>
                <th className="py-2 px-4 border-b text-white">Precio Unitario</th>
                <th className="py-2 px-4 border-b text-white">Impuestos</th>
                <th className="py-2 px-4 border-b text-white">Impuestos no incluidos</th>
              </tr>
            </thead>
            <tbody className="text-black text-center">
              {productosEjemplo.map((producto, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{producto.nombre}</td>
                  <td className="py-2 px-4 border-b">{producto.descripcion}</td>
                  <td className="py-2 px-4 border-b">{producto.cantidad}</td>
                  <td className="py-2 px-4 border-b">{currencyFormatter.format(producto.precioUnitario)}</td>
                  <td className="py-2 px-4 border-b">
                    <span className="bg-gray-300 text-gray-800 text-xs font-medium px-2 py-1 rounded">
                      {producto.impuestos}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {currencyFormatter.format(producto.impuestosNoIncluidos)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>



        {/* Detalles adicionales */}

        <div className="pt-4 mt-4 border-t border-gray-200">
          <div className="mb-4">
            Detalles...
          </div>
        </div>

        {/* Resumen de Totales */}
        <div className="flex justify-end">
          <div className="flex flex-col items-end">
            <div className="flex items-center mb-2">
              <span className="font-medium text-gray-700 mr-2">Base imponible:</span>
              <span className="font-bold">{currencyFormatter.format(formData.subtotal)}</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="font-medium text-gray-700 mr-2">IGV:</span>
              <span className="font-bold">{currencyFormatter.format(formData.impuestos)}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-gray-700 mr-2">Total:</span>
              <span className="text-xl font-bold">{currencyFormatter.format(formData.total)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-4 border-t border-gray-200">
          <div className="flex justify-between mb-4">
            <div className="flex">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded mr-2">
                Escribir una nota
              </button>
            </div>
            <div className="flex">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded mr-2">
                Enviar por correo electrónico
              </button>
            </div>
          </div>

          <div className="flex justify-between mb-4">
            <div className="flex">

            </div>
            <div className="flex">

            </div>
          </div>
          <div className="flex justify-between mb-4">
            {/* Última modificación */}
            <div className="flex">
              <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold mr-2">
                W
              </div>
              <span className="font-medium">
                {formData.cliente} - hace 2 minutos
              </span>
            </div>
            {/* Botón Cerrar */}
            <div className="flex">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderModal;