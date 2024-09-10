"use client";
import React, { useState, useEffect } from "react";
import { useStore } from "@/stores/autenticacion";
import { useSession } from "next-auth/react";

const ProductAddModal = ({ productos, isOpen, onClose, onAddProduct, product }) => {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    cantidadStock: "",
    unidad_medida: "",
    estado: "",
  });
  const [categorias, setCategorias] = useState([]);
  const [errors, setErrors] = useState({});
  const user = useStore((state) => state.user);
  console.log("productos en stock", productos);
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

  const validateNombre = (nombre) => /^[a-zA-Z0-9\s\(\)mlpack]{1,50}$/.test(nombre);
  const validatePrecio = (precio) => /^\d+(\.\d{1,2})?$/.test(precio);
  const validateCantidadStock = (cantidadStock) => /^\d+$/.test(cantidadStock);
  const validateUnidadMedida = (unidad_medida) => /^[a-zA-Z0-9\s]{1,20}$/.test(unidad_medida);
  const validateEstado = (estado) => /^[a-zA-Z\s]{1,20}$/.test(estado);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate fields
    switch (name) {
      case "nombre":
        setErrors((prevErrors) => ({
          ...prevErrors,
          nombre: validateNombre(value) ? "" : "Formato de nombre inválido.",
        }));
        break;
      case "precio":
        setErrors((prevErrors) => ({
          ...prevErrors,
          precio: validatePrecio(value) ? "" : "El precio debe ser un número válido con hasta dos decimales.",
        }));
        break;
      case "cantidadStock":
        setErrors((prevErrors) => ({
          ...prevErrors,
          cantidadStock: validateCantidadStock(value) ? "" : "La cantidad en stock debe ser un número entero.",
        }));
        break;
      case "unidad_medida":
        setErrors((prevErrors) => ({
          ...prevErrors,
          unidad_medida: validateUnidadMedida(value) ? "" : "La unidad de medida solo puede contener letras y espacios.",
        }));
        break;
      case "estado":
        setErrors((prevErrors) => ({
          ...prevErrors,
          estado: validateEstado(value) ? "" : "El estado solo puede contener letras y espacios.",
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors = {
      nombre: validateNombre(formData.nombre) ? "" : "El nombre solo puede contener letras y espacios.",
      precio: validatePrecio(formData.precio) ? "" : "El precio debe ser un número válido con hasta dos decimales.",
      cantidadStock: validateCantidadStock(formData.cantidadStock) ? "" : "La cantidad en stock debe ser un número entero.",
      unidad_medida: validateUnidadMedida(formData.unidad_medida) ? "" : "La unidad de medida solo puede contener letras y espacios.",
      estado: validateEstado(formData.estado) ? "" : "El estado solo puede contener letras y espacios.",
    };

    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) return;

    // Check if product already exists
    const productExists = productos.some(p => p.nombre === formData.nombre);
    if (productExists) {
      setErrors(prevErrors => ({
        ...prevErrors,
        nombre: "El producto ya existe en el inventario.",
      }));
      return;
    }

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
    });
    handleClose();
  };
  
  const handleClose = () => {
    setFormData({
      nombre: "",
      precio: "",
      cantidadStock: "",
      unidad_medida: "",
      estado: "",
    });
    setErrors({
      nombre: "",
      precio: "",
      cantidadStock: "",
      unidad_medida: "",
      estado: "",
    });
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
              className={`mt-1 block w-full border ${errors.nombre ? "border-red-500" : "border-gray-300"} rounded-md p-2`}
            />
            {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Precio</label>
            <input
              type="number"
              step="0.01"
              name="precio"
              value={formData.precio || ""}
              onChange={handleChange}
              className={`mt-1 block w-full border ${errors.precio ? "border-red-500" : "border-gray-300"} rounded-md p-2`}
            />
            {errors.precio && <p className="text-red-500 text-sm">{errors.precio}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Cantidad en Stock</label>
            <input
              type="number"
              name="cantidadStock"
              value={formData.cantidadStock || ""}
              onChange={handleChange}
              className={`mt-1 block w-full border ${errors.cantidadStock ? "border-red-500" : "border-gray-300"} rounded-md p-2`}
            />
            {errors.cantidadStock && <p className="text-red-500 text-sm">{errors.cantidadStock}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Unidad de Medida</label>
            <input
              type="text"
              name="unidad_medida"
              value={formData.unidad_medida}
              onChange={handleChange}
              className={`mt-1 block w-full border ${errors.unidad_medida ? "border-red-500" : "border-gray-300"} rounded-md p-2`}
            />
            {errors.unidad_medida && <p className="text-red-500 text-sm">{errors.unidad_medida}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Estado</label>
            <input
              type="text"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className={`mt-1 block w-full border ${errors.estado ? "border-red-500" : "border-gray-300"} rounded-md p-2`}
            />
            {errors.estado && <p className="text-red-500 text-sm">{errors.estado}</p>}
          </div>
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={handleClose}
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
