import React, { useState, useEffect } from "react";
import { useStore } from "@/stores/autenticacion";

const ProductModal = ({ setIsEditModalOpen, formDataEdit, onUpdateProduct }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    precio: 0,
    categoria: ""
  });
  
  const user = useStore((state) => state.user);

  useEffect(() => {
    if (formDataEdit) {
      setFormData({
        id:formDataEdit.id,
        nombre: formDataEdit.nombre,
        precio: formDataEdit.precio,
        categoria: formDataEdit.categoria.nombre,
        unidad_medida: formDataEdit.unidad_medida,
        estado: formDataEdit.estado
      });
    }
  }, [formDataEdit]);
  console.log(formDataEdit)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datos = {
      nombre: formData.nombre,
      precio: parseFloat(formData.precio),
      categoria: formData.categoria,
      unidad_medida: formData.unidad_medida,
      estado: formData.estado
    };
    onUpdateProduct(datos);     
    console.log(datos)  
    setIsEditModalOpen(false); 
    
  };

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
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Precio</label>
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Categoría</label>
            <input
              type="text"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
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
