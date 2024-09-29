import React, { useState, useEffect } from "react";

const ProductModal = ({
  products,
  setIsEditModalOpen,
  formDataEdit,
  onUpdateProduct,
  categoria,
}) => {
  const [formData, setFormData] = useState({
    id: formDataEdit.id,
    nombre: formDataEdit.nombre,
    precio: formDataEdit.precio,
    estado: formDataEdit.estado,
  });

  const [errors, setErrors] = useState({
    nombre: "",
    precio: "",
  });

  const validateNombre = (nombre) => /^[a-zA-Z0-9\s\(\)]{1,50}$/.test(nombre);
  const validatePrecio = (precio) => /^\d+(\.\d{1,2})?$/.test(precio);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    switch (name) {
      case "nombre":
        setErrors((prevErrors) => ({
          ...prevErrors,
          nombre: validateNombre(value) ? "" : "El nombre debe contener solo letras, números y espacios.",
        }));
        break;
      case "precio":
        setErrors((prevErrors) => ({
          ...prevErrors,
          precio: validatePrecio(value) ? "" : "El precio debe ser un número válido con hasta dos decimales.",
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      nombre: validateNombre(formData.nombre) ? "" : "El nombre debe contener solo letras, números y espacios.",
      precio: validatePrecio(formData.precio) ? "" : "El precio debe ser un número válido con hasta dos decimales.",
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) return;

    const productExists = products.some(p => p.nombre === formData.nombre && p.id !== formData.id);
    if (productExists) {
      setErrors(prevErrors => ({
        ...prevErrors,
        nombre: "Ya existe un producto con este nombre.",
      }));
      return;
    }
    onUpdateProduct(formData);
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    setFormData({
      id: formDataEdit.id,
      nombre: formDataEdit.nombre,
      precio: formDataEdit.precio,
      estado: formDataEdit.estado,
    });
  }, [formDataEdit]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-black z-50">
      <div className="bg-[#2A2C39] p-6 rounded-lg shadow-lg max-w-sm w-full divide-y divide-[#3D4059]">
        <h2 className="text-lg font-semibold text-white mb-4">Modificar Producto</h2>
        <form onSubmit={handleSubmit} className="pt-4">
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-300 text-sm font-medium mb-2">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-md p-2 bg-[#171821] text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="precio" className="block text-gray-300 text-sm font-medium mb-2">Precio</label>
            <input
              type="number"
              id="precio"
              step="0.01"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-md p-2 bg-[#171821] text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {errors.precio && <p className="text-red-500 text-sm">{errors.precio}</p>}
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="bg-gradient-to-r from-gray-600 to-gray-800 text-white py-2 px-6 rounded-full shadow-md hover:from-gray-700 hover:to-gray-900 mr-4"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-6 rounded-full shadow-md hover:from-blue-600 hover:to-blue-800"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;