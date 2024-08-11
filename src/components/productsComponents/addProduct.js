"use client";
import React, { useState, useEffect } from "react";
import { useStore } from "@/stores/autenticacion"; // Asegúrate de que la tienda esté correctamente configurada

const ProductAddModal = ({ isOpen, onClose, onAddProduct, onUpdateProduct, onDeleteProduct, product }) => {
  const [formData, setFormData] = useState({ name: '', price: '', category: '' });
  const [categoria,setCategoria]=useState(null)
  const user = useStore((state) => state.user); // Obtén el usuario para verificar el rol
    useEffect(()=>{
    const traerCategorias= async()=>{
      try {
        const  res=await fetch("http://localhost:3010/categoria", {
          headers: {
              'Authorization': `Bearer ${user.token}`,
          }
      })
        const data=await res.json()
        setCategoria(data)
        
      } catch (error) {
         console.log(error)
      }
     

        
    }

    traerCategorias()
  }
 
,[])
  useEffect(() => {
    if (product) {
      setFormData({ ...product });
    } else {
      setFormData({ name: '', price: '', category: '' });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product) {
      // Editar producto existente
      onUpdateProduct({ ...formData, id: product.id });
    } else {
      // Agregar nuevo producto
      onAddProduct({ ...formData, id: Date.now() }); // Generar un ID único basado en la fecha actual
    }
    onClose();
  };

  const handleDelete = () => {
    if (product) {
      // Llama a la función para eliminar el producto
      onDeleteProduct(product.id);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-black">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">
          {product ? "Modificar Producto" : "Agregar Producto"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Precio</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Categoría</label>
            <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
      >
        <option value="">--Seleccione una categoría--</option>
        {
          categoria&&categoria.map(item=>(

            <option key={item.id} value={item.nombre}> {item.nombre}</option>
        
          ))
        }
      </select>
          </div>
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-1 px-3 rounded mr-2 hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
            >
              {product ? "Guardar Cambios" : "Agregar Producto"}
            </button>
            {user.rol === "admin" && product && (
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white py-1 px-3 rounded ml-2 hover:bg-red-600"
              >
                Eliminar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductAddModal;
