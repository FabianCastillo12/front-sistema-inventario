import React, { useState, useEffect } from "react";
import { useFormats } from "@/hooks/useFormats";
import { useClientes } from "@/hooks/useClients";
import { useProducts } from "@/hooks/useProducts";

const OrderModal = ({ setIsEditModalOpen, formDataEdit, onUpdateOrder, onClose}) => {
  const { products } = useProducts();
  const { clientes } = useClientes();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("nombre");
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [productSearchQuery, setProductSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { currencyFormatter } = useFormats();
  console.log("formDataEdit", formDataEdit);

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

  useEffect(() => {
    if (productSearchQuery.trim() === "") {
      setFilteredProducts([]);
    } else {
      const queryLower = productSearchQuery.toLowerCase();
      setFilteredProducts(
        products.filter((product) => {
          const nombre = product.nombre ? product.nombre.toLowerCase() : "";
          const descripcion = product.descripcion
            ? product.descripcion.toLowerCase()
            : "";

          return (
            nombre.includes(queryLower) || descripcion.includes(queryLower)
          );
        })
      );
    }
  }, [productSearchQuery, products]);

  const [formData, setFormData] = useState({
    id: formDataEdit.cliente.id,
    fecha: "",
    nombre: formDataEdit.cliente.nombre,
    email: formDataEdit.cliente.email,
    telefono: formDataEdit.cliente.telefono,
    direccion: formDataEdit.cliente.direccion,
    productos: formDataEdit.detallePedidos.map((detalle) => {
      const producto = detalle.producto; // Producto dentro del detalle
      
      const impuestos = producto.precio * 0.18;
      
      const newProduct = {
        ...(detalle.id ? { idDetalle: detalle.id } : {}),
        id: producto.id,
        nombre: producto.nombre,
        descripcion: producto.categoria.descripcion,
        stock: producto.cantidadStock,
        cantidad: detalle.cantidad, // Cantidad del detalle, no siempre 1
        precio: producto.precio,
        impuestos,
        impuestosNoIncluidos: impuestos,
      };
  
      return newProduct;
    }),
    total: 0,
  });
  console.log(formData, "formData");
  useEffect(() => {
    if (setIsEditModalOpen) {
      const currentDate = new Date().toISOString().split("T")[0]; 
      setFormData((prevFormData) => ({
        ...prevFormData,
        fecha: currentDate,
      }));
    }
  }, [setIsEditModalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.id) {
      alert("Por favor, seleccione un cliente.");
      return;
    }
    if (formData.productos.length === 0) {
      alert("Por favor, agregue al menos un producto.");
      return;
    }

    const detalles = formData.productos.map((product) => ({
      ...(product.idDetalle ? { id: product.idDetalle } : {}),
      cantidad: product.cantidad,
      productoId: product.id,
    }));

    const orderData = {
      estado: "Registrado",
      clienteId: formData.id,
      detalles: detalles,
    };
    console.log("orderData", orderData, "ID DEL PEDIDO", formDataEdit.id);
    onUpdateOrder(orderData, formDataEdit.id);
    setFormData({ clienteSeleccionadoId: "", productos: [] });
  };

  const handleEditProductRow = (index, field, value) => {
    const updatedProducts = [...formData.productos];
    updatedProducts[index][field] = value;
    setFormData({ ...formData, productos: updatedProducts });
    calculateTotal(updatedProducts);
  };

  const handleDeleteProductRow = (index) => {
    const updatedProducts = formData.productos.filter((_, i) => i !== index);
    setFormData({ ...formData, productos: updatedProducts });
    calculateTotal(updatedProducts);
  };

  const handleAddProductRow = (product) => {
    const isProductAlreadyAdded = formData.productos.some(
      (p) => p.id === product.id
    );

    if (isProductAlreadyAdded) {
      alert("El producto ya está en la lista.");
      return;
    }

    const newProduct = {
      id: product.id,
      nombre: product.nombre,
      descripcion: product.categoria.descripcion,
      stock: product.cantidadStock,
      cantidad: 1,
      precio: product.precio,
      impuestos: product.precio * 0.18,
      impuestosNoIncluidos: product.precio * 0.18,
    };
    const updatedProducts = [...formData.productos, newProduct];
    setFormData({
      ...formData,
      productos: updatedProducts,
    });
    calculateTotal(updatedProducts);
    setProductSearchQuery("");
  };

  const handleClientSelect = (cliente) => {
    setFormData({
      ...formData,
      id: cliente.id,
      nombre: cliente.nombre,
      email: cliente.email,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
    });
    setSearchQuery(""); // Clear search after selection
  };

  const calculateTotal = (productos) => {
    const total = productos.reduce((acc, product) => {
      return acc + product.precio * product.cantidad;
    }, 0);

    const igv = total * 0.18;
    const baseImponible = total - igv;

    setFormData((prevFormData) => ({
      ...prevFormData,
      total: total,
      igv: igv,
      baseImponible: baseImponible,
    }));
  };

  if (!setIsEditModalOpen) return null;

  return (
    (<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-black z-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-[calc(90vw-4rem)] w-full overflow-y-auto max-h-[calc(80vh-4rem)] scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-semibold">Editar Pedido</div>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1"
            placeholder="Ingresa la fecha"
          />
        </div>
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
            disabled
          />
          <div className="font-medium mb-2 mt-2">Email:</div>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 w-full"
            placeholder="Email del cliente"
            disabled
          />
          <div className="font-medium mb-2 mt-2">Teléfono:</div>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 w-full"
            placeholder="Teléfono del cliente"
            disabled
          />
          <div className="font-medium mb-2 mt-2">Dirección:</div>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 w-full"
            placeholder="Dirección del cliente"
            disabled
          />
        </div>

        <div className="py-4 border-t pt-4">
          <div className="font-medium mb-2">Buscar Producto:</div>
          <div className="flex mb-2 gap-20">
            <input
              type="text"
              value={productSearchQuery}
              onChange={(e) => setProductSearchQuery(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-full"
              placeholder="Buscar productos"
            />
          </div>
          {productSearchQuery.trim() && filteredProducts.length > 0 && (
            <div className="border border-gray-300 rounded mt-2 max-h-48 overflow-y-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead className="bg-[#05023c] text-white">
                  <tr>
                    <th className="py-2 px-4 border-b text-center">Nombre</th>
                    <th className="py-2 px-4 border-b text-center">
                      Descripción
                    </th>
                    <th className="py-2 px-4 border-b text-center">Precio</th>
                    <th className="py-2 px-4 border-b text-center">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      onClick={() => handleAddProductRow(product)}
                      className="cursor-pointer hover:bg-gray-100 text-center"
                    >
                      <td className="py-2 px-4 border-b">{product.nombre}</td>
                      <td className="py-2 px-4 border-b">
                        {product.descripcion}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {currencyFormatter.format(product.precio)}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button className="bg-blue-500 text-white px-2 py-1 rounded">
                          Agregar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="py-4">
          <div className="font-medium mb-2">Productos Añadidos:</div>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-[#05023c] text-white">
              <tr>
                <th className="py-2 px-4 border-b text-center">Nombre</th>
                <th className="py-2 px-4 border-b text-center">Descripción</th>
                <th className="py-2 px-4 border-b text-center">Cantidad</th>
                <th className="py-2 px-4 border-b text-center">Precio</th>
                <th className="py-2 px-4 border-b text-center">Impuestos</th>
                <th className="py-2 px-4 border-b text-center">Subtotal</th>
                <th className="py-2 px-4 border-b text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {formData.productos.map((product, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{product.nombre}</td>
                  <td className="py-2 px-4 border-b">{product.descripcion}</td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={product.cantidad}
                      onChange={(e) =>
                        handleEditProductRow(
                          index,
                          "cantidad",
                          Math.min(parseFloat(e.target.value) || 1, product.stock + product.cantidad)
                        )
                      }
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    {currencyFormatter.format(product.precio)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {currencyFormatter.format(
                      product.impuestos * product.cantidad
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {currencyFormatter.format(
                      product.precio * product.cantidad
                    )}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleDeleteProductRow(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-4">
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

        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Guardar Pedido
          </button>
        </div>
      </div>
    </div>)
  );
};

export default OrderModal;