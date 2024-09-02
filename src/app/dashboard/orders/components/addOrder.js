"use client";
import React, { useState, useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useClientes } from "@/hooks/useClients";

const OrderAddModal = ({ isOpen, onClose, onAddOrder }) => {
  const { products } = useProducts();
  const { clientes } = useClientes();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("nombre");
  const [filteredClientes, setFilteredClientes] = useState([]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredClientes([]);
    } else {
      const queryLower = searchQuery.toLowerCase();
      setFilteredClientes(
        clientes.filter((cliente) => {
          const nombre = cliente.nombre ? cliente.nombre.toLowerCase() : "";
          const dni = cliente.dni ? cliente.dni.toLowerCase() : "";
          const ruc = cliente.ruc ? cliente.ruc.toLowerCase() : "";
          
          switch (searchCriteria) {
            case "nombre":
              return nombre.includes(queryLower);
            case "dni":
              return dni.includes(queryLower);
            case "ruc":
              return ruc.includes(queryLower);
            default:
              return false;
          }
        })
      );
    }
  }, [searchQuery, searchCriteria, clientes]);

  const [formData, setFormData] = useState({
    id: "",
    fecha: "",
    cliente: "",
    email: "",
    telefono: "",
    direccion: "",
    productos: [],
  });

  useEffect(() => {
    if (isOpen) {
      const currentDate = new Date().toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      setFormData((prevFormData) => ({
        ...prevFormData,
        fecha: currentDate,
      }));
    }
  }, [isOpen]);

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
      impuestosNoIncluidos: 0,
    };
    setFormData({
      ...formData,
      productos: [...formData.productos, newProduct],
    });
  };

  const handleClientSelect = (cliente) => {
    setFormData({
      ...formData,
      nombre: cliente.nombre,
      cliente: cliente.nombre,
      email: cliente.email,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
    });
    setSearchQuery(""); // Clear search after selection
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-black z-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-[calc(90vw-4rem)] w-full overflow-y-auto max-h-[calc(80vh-4rem)] scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-semibold">Agregar Pedido</div>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1"
            placeholder="Ingresa la fecha"
          />
        </div>

        {/* Información del Cliente */}
        <div className="py-4 border-b pb-4">
          <div className="font-medium mb-2">Buscar Cliente:</div>
          <div className="flex mb-2 gap-20">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-full"
              placeholder="Buscar"
            />
            <select
              value={searchCriteria}
              onChange={(e) => setSearchCriteria(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-1/3 mr-2"
            >
              <option value="nombre">Nombre</option>
              <option value="dni">DNI</option>
              <option value="ruc">RUC</option>
            </select>
          </div>
          {searchQuery.trim() && filteredClientes.length > 0 && (
            <div className="border border-gray-300 rounded mt-2 max-h-48 overflow-y-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead className="bg-[#05023c] text-white">
                  <tr>
                    <th className="py-2 px-4 border-b text-center">Nombre</th>
                    <th className="py-2 px-4 border-b text-center">DNI</th>
                    <th className="py-2 px-4 border-b text-center">RUC</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClientes.map((cliente) => (
                    <tr
                      key={cliente.id}
                      onClick={() => handleClientSelect(cliente)}
                      className="cursor-pointer hover:bg-gray-100 text-center"
                    >
                      <td className="py-2 px-4 border-b">{cliente.nombre}</td>
                      <td className="py-2 px-4 border-b">{cliente.dni}</td>
                      <td className="py-2 px-4 border-b">{cliente.ruc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="py-4">
          <div className="font-medium mb-2">Nombre:</div>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 w-full"
            placeholder="Nombre del cliente"
            readOnly
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
            placeholder="Email del cliente"
            readOnly
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
            placeholder="Teléfono del cliente"
            readOnly
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
            placeholder="Dirección del cliente"
            readOnly
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
          <h3 className="text-lg font-semibold mb-4">Productos</h3>
          <table className="w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border-b px-4 py-2">Nombre</th>
                <th className="border-b px-4 py-2">Descripción</th>
                <th className="border-b px-4 py-2">Cantidad</th>
                <th className="border-b px-4 py-2">Precio Unitario</th>
                <th className="border-b px-4 py-2">Impuestos</th>
                <th className="border-b px-4 py-2">Impuestos No Incluidos</th>
                <th className="border-b px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {formData.productos.map((producto, index) => (
                <tr key={index}>
                  <td className="border-b px-4 py-2">
                    <input
                      type="text"
                      value={producto.nombre}
                      onChange={(e) =>
                        handleEditProductRow(index, "nombre", e.target.value)
                      }
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </td>
                  <td className="border-b px-4 py-2">
                    <input
                      type="text"
                      value={producto.descripcion}
                      onChange={(e) =>
                        handleEditProductRow(index, "descripcion", e.target.value)
                      }
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </td>
                  <td className="border-b px-4 py-2">
                    <input
                      type="number"
                      value={producto.cantidad}
                      onChange={(e) =>
                        handleEditProductRow(index, "cantidad", e.target.value)
                      }
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      min="1"
                    />
                  </td>
                  <td className="border-b px-4 py-2">
                    <input
                      type="number"
                      value={producto.precioUnitario}
                      onChange={(e) =>
                        handleEditProductRow(index, "precioUnitario", e.target.value)
                      }
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      step="0.01"
                    />
                  </td>
                  <td className="border-b px-4 py-2">
                    {producto.impuestos}
                  </td>
                  <td className="border-b px-4 py-2">
                    {currencyFormatter.format(producto.impuestosNoIncluidos)}
                  </td>
                  <td className="border-b px-4 py-2">
                    <button
                      onClick={() => handleDeleteProductRow(index)}
                      className="text-red-500"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleAddProductRow}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Agregar Producto
          </button>
        </div>

        {/* Botones */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderAddModal;
