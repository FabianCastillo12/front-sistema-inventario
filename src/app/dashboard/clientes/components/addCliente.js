"use client";
import React, { useState } from "react";

const AddClienteModal = ({ isOpen, onClose , onAddCliente }) => { 
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "", 
    direccion: "", 
    dni: "",
    ruc: "",
  });
  const [errors, setErrors] = useState({ dni: '' });
  
  const validateDNI = (dni) => {
    const dniPattern = /^\d{8}$/;
    return dniPattern.test(dni);
  };

  const validateRUC = (ruc) => {
    const rucPattern = /^(10|20)\d{9}$/;
    return rucPattern.test(ruc);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dni') {
      if (!validateDNI(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          dni: 'El DNI debe tener 8 dígitos numéricos.',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          dni: '',
        }));
      }
    }
    if (name === 'ruc') {
      if (!validateRUC(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          ruc: 'Formato de RUC incorrecto. Se espera 11 dígitos numéricos, empezando con 10 o 20.',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          ruc: '',
        }));
      }
    }
    setFormData({ ...formData, [name]: value });
  };
  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateDNI(formData.dni)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        dni: 'El DNI debe tener 8 dígitos numéricos.',
      }));
      return;
    }
    if (!validateRUC(formData.ruc)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ruc: 'Formato de RUC incorrecto.',
      }));
      return;
    }
    console.log("Nuevo cliente:", formData); 
    onAddCliente(formData); 
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-black">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Agregar Cliente</h2> 
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
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Teléfono</label> {/* Nuevo campo */}
            <input
              type="text" 
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Dirección</label> 
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">DNI</label> 
            <input
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              className={`w-full border ${errors.dni ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
              required
            />
            {errors.dni && <p className="text-red-500 text-xs mt-1">{errors.dni}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">RUC</label>
            <input
              type="text"
              name="ruc"
              value={formData.ruc}
              onChange={handleChange}
              className={`w-full border ${errors.ruc ? 'border-red-500' : 'border-gray-300'} rounded p-2`}
              required
            />
            {errors.ruc && <p className="text-red-500 text-xs mt-1">{errors.ruc}</p>}
          </div>
          <div className="flex justify-end">
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
              Agregar 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClienteModal;