"use client";
import React, { useState } from "react";

const OrderAddModal = ({ isOpen, onClose, onAddOrder }) => {
  const [formData, setFormData] = useState({
    id: "",
    fecha: "",
    cliente: "",
    email: "",
    telefono: "",
    direccion: "",
    productos: [],
    subtotal: 0,
    descuento: 0,
    impuestos: 0,
    total: 0,
    notas: "",
    metodoPago: "",
    estado: "Pendiente",
  });

  const currencyFormatter = new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddOrder(formData);
    onClose();
  };

  const handleEditProductRow = (index, field, value) => {
    const updatedProducts = [...formData.productos];
    updatedProducts[index][field] = value;
    setFormData({ ...formData, productos: updatedProducts });
  };

  const handleDeleteProductRow = (index) => {
    const updatedProducts = formData.productos.filter((_, i) => i !== index);
    setFormData({ ...formData, productos: updatedProducts });
  };

  const handleAddProductRow = () => {
    const newProduct = {
      nombre: "",
      descripcion: "",
      cantidad: 1,
      precioUnitario: 0,
      impuestos: "IGV 18%",
      impuestosNoIncluidos: 0
    };
    setFormData({
      ...formData,
      productos: [...formData.productos, newProduct]
    });
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-black z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-[calc(90vw-4rem)] w-full overflow-y-auto max-h-[calc(80vh-4rem)] scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100" style={{ scrollbarWidth: 'none' }}>

        {/* Encabezado */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center">
            <i className="fas fa-bars mr-2"></i>
            <h2 className="font-medium mr-2">ID del Pedido: </h2> 
            <span className="font-bold">Automático</span> 
          </div>
          <div className="flex items-center">
            <i className="fas fa-bars mr-2"></i>
            <h2 className="font-medium mr-2">Fecha del Pedido: </h2>
            <input
              type="text"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="border border-gray-300 rounded px-2 py-1"
              placeholder="Ingresa la fecha" 
            />
          </div>
          <div className="flex items-center">
            <i className="fas fa-bars mr-2"></i>
            <h2 className="font-medium mr-2">Estado del Pedido: </h2>
            <input
              type="text"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="border border-gray-300 rounded px-2 py-1"
              readOnly 
            />
          </div>
        </div>

        {/* Información del Cliente */}
        <div className="py-4">
          <div className="font-medium mb-2">Cliente:</div>
          <input
            type="text"
            name="cliente"
            value={formData.cliente}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 w-full"
            placeholder="Ingresa el nombre del cliente" 
          />
        </div>
        <div className="py-4">
          <div className="font-medium mb-2">Email:</div>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 w-full"
            placeholder="Ingresa el email del cliente" 
          />
        </div>
        <div className="py-4">
          <div className="font-medium mb-2">Teléfono:</div>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 w-full"
            placeholder="Ingresa el teléfono del cliente" 
          />
        </div>
        <div className="py-4">
          <div className="font-medium mb-2">Dirección:</div>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 w-full"
            placeholder="Ingresa la dirección del cliente" 
          />
        </div>

        {/* Pestañas */}
        <div className="flex border-b mb-4">
          <div className="px-4 py-2 cursor-pointer border-b-2 border-blue-500 text-blue-500 font-medium">
            Líneas del pedido
          </div>
        </div>

        {/* Tabla de Productos */}
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
                <th className="py-2 px-4 border-b text-white">Acciones</th> 
              </tr>
            </thead>
            <tbody className="text-black text-center">
              {formData.productos.map((producto, index) => ( 
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={producto.nombre}
                      onChange={(e) => handleEditProductRow(index, "nombre", e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      placeholder="Nombre del producto"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={producto.descripcion}
                      onChange={(e) => handleEditProductRow(index, "descripcion", e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      placeholder="Descripción"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="number"
                      value={producto.cantidad}
                      onChange={(e) => handleEditProductRow(index, "cantidad", e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      placeholder="Cantidad"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="number"
                      value={producto.precioUnitario}
                      onChange={(e) => handleEditProductRow(index, "precioUnitario", e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      placeholder="Precio Unitario" 
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={producto.impuestos}
                      onChange={(e) => handleEditProductRow(index, "impuestos", e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      placeholder="Impuestos" 
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="number"
                      value={producto.impuestosNoIncluidos}
                      onChange={(e) => handleEditProductRow(index, "impuestosNoIncluidos", e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      placeholder="Imp. no incl."
                    />
                  </td>
                  <td className="py-2 px-4 border-b flex"> 
                    <button
                      onClick={() => handleEditProductRow(index)} 
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-1" 
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteProductRow(index)} 
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botones para agregar producto y otras acciones */}
        <div className="flex justify-between mb-4">
          <div className="flex">
            <button
              onClick={handleAddProductRow}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded mr-2"
            >
              Agregar Producto
            </button>
          </div>
        </div>

        {/* Resumen de Totales */}
        {/* ... (código del resumen de totales - sin cambios) */}
        <div className="flex space-x-4">
          <div className="w-1/2">

            <textarea
              id="notas"
              name="notas"
              rows="5"
              value={formData.notas}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Escribe aquí las notas del pedido"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-end items-end">
            <div className="w-full max-w-xs">

              <div className="flex justify-between mb-4">

                <div className="flex justify-start items-start mb-2">
                  <span className="font-medium text-gray-700 mr-5">Base imponible:</span>
                </div>
                <div className="flex justify-start items-start mb-2">
                  <span className="font-bold">{currencyFormatter.format(formData.subtotal)}</span>
                </div>
              </div>
              <div className="flex justify-between mb-4">
                <div className="flex justify-start mb-2">
                  <span className="font-medium text-gray-700 mr-5">IGV:</span>
                </div>
                <div className="flex justify-start mb-2">
                  <span className="font-bold">{currencyFormatter.format(formData.impuestos)}</span>
                </div>
              </div>
              <div className="flex justify-between mb-4">
                <div className="flex justify-start mb-2">
                  <span className="font-medium text-gray-700 mr-5">Total:</span>
                </div>
                <div className="flex justify-start mb-2">
                  <span className="text-xl font-bold">{currencyFormatter.format(formData.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-4 border-t border-gray-200">
          {/* ... (código del footer - sin cambios) */}
          <div className="flex justify-between mb-4">
            <div className="flex">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded mr-2">
                Escribir una nota
              </button>
            </div>
            <div className="flex">

            </div>
          </div>
          <div className="flex justify-between mb-4">

            {/* Última modificación */}
            <div className="flex mt-6">
              <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold mr-2">
                W
              </div>
              <span className="font-medium">
                {formData.cliente} - hace 2 minutos
              </span>
            </div>
            {/* Botón Guardar y Cerrar */}
            <div className="flex mt-6">
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded mr-2"
              >
                Guardar
              </button>
              <button
                onClick={onClose} 
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

export default OrderAddModal;