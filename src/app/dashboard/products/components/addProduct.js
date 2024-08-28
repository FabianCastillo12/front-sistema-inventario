"use client";
import React, { useState, useEffect } from "react";
import { useStore } from "@/stores/autenticacion";
import { useSession } from "next-auth/react";

const ProductAddModal = ({ isOpen, onClose, onAddProduct, product }) => {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    cantidadStock: "",
    unidad_medida: "",
    estado: "",
  });
  const [categorias, setCategorias] = useState([]);
  const user = useStore((state) => state.user);

  // Fetch categories
  useEffect(() => {
    const traerCategorias = async () => {
      try {
        const res = await fetch("http://localhost:3010/categoria", {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        });
        const data = await res.json();
        setCategorias(data);
      } catch (error) {
        console.log(error);
      }
    };

    traerCategorias();
  }, [user.token]);

  // Populate form data when product is set
  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre || "",
        precio: product.precio || "",
        cantidadStock: product.cantidadStock || "",
        unidad_medida: product.unidad_medida || "",
        estado: product.estado || "",
      });
    } else {
      setFormData({
        nombre: "",
        precio: "",
        cantidadStock: "",
        unidad_medida: "",
        estado: "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "precio" || name === "cantidadStock" ? value : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      precio: parseFloat(formData.precio),
      cantidadStock: parseInt(formData.cantidadStock, 10),
    };

    onAddProduct(productData);
    setFormData({
      nombre: "",
      precio: "",
      cantidadStock: "",
      unidad_medida: "",
      estado: "",
    })
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
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Precio</label>
            <input
              type="number"
              step="0.01"
              name="precio"
              value={formData.precio || ""}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Cantidad en Stock</label>
            <input
              type="number"
              name="cantidadStock"
              value={formData.cantidadStock || ""}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Unidad de Medida</label>
            <input
              type="text"
              name="unidad_medida"
              value={formData.unidad_medida}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Estado</label>
            <input
              type="text"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
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
              Agregar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductAddModal;
