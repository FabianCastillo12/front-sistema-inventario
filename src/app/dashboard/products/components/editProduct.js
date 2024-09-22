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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate fields
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

  // Handle form submission
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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-black">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Modificar Producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`mt-1 block w-full border ${errors.nombre ? "border-red-500" : "border-gray-300"} rounded-md p-2`}
              required
            />
            {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Precio</label>
            <input
              type="number"
              step="0.01"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              className={`mt-1 block w-full border ${errors.precio ? "border-red-500" : "border-gray-300"} rounded-md p-2`}
              required
            />
            {errors.precio && <p className="text-red-500 text-sm">{errors.precio}</p>}
          </div>
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="bg-gray-500 text-white py-1 px-3 rounded mr-2 hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
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
