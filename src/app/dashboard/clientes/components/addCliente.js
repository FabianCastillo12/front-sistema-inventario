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
  const [errors, setErrors] = useState({ dni: '', ruc: '', nombre: '', email: '', telefono: '' });
  
  // Validar campos con regex
  const validateDNI = (dni) => /^\d{8}$/.test(dni);
  const validateRUC = (ruc) => /^(10|20)\d{9}$/.test(ruc);
  const validateNombre = (nombre) => /^[a-zA-Z\s]{1,20}$/.test(nombre);
  const validateEmail = (email) => 
    /^[a-zA-Z0-9._-]{1,50}@[a-zA-Z0-9.-]{1,50}\.[a-zA-Z]{2,}$/.test(email);
  const validateTelefono = (telefono) => /^\d{9,15}$/.test(telefono);
  const validateDireccion = (direccion) =>
    /^[a-zA-Z0-9\s.,#-]{1,200}$/.test(direccion);

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'dni':
        setErrors((prevErrors) => ({
          ...prevErrors,
          dni: validateDNI(value) ? '' : 'El DNI debe tener 8 dígitos numéricos.',
        }));
        break;
      case 'ruc':
        setErrors((prevErrors) => ({
          ...prevErrors,
          ruc: validateRUC(value) ? '' : 'Formato de RUC incorrecto. Se espera 11 dígitos numéricos, empezando con 10 o 20.',
        }));
        break;
      case 'nombre':
        setErrors((prevErrors) => ({
          ...prevErrors,
          nombre: validateNombre(value) ? '' : 'El nombre solo puede contener letras y espacios.',
        }));
        break;
      case 'email':
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: validateEmail(value) ? '' : 'Formato de email inválido.',
        }));
        break;
      case 'telefono':
        setErrors((prevErrors) => ({
          ...prevErrors,
          telefono: validateTelefono(value) ? '' : 'El teléfono debe tener entre 9 y 15 dígitos.',
        }));
        break;
      case 'direccion':
        setErrors((prevErrors) => ({
          ...prevErrors,
          direccion: validateDireccion(value) ? '' : 'Formato de dirección inválido.',
        }));
        break;
      default:
        break;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verificar que no haya errores antes de enviar
    if (Object.values(errors).some(error => error)) return;

    console.log("Nuevo cliente:", formData);
    onAddCliente(formData);
    onClose();
  };

  const handleClose = () => {
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      direccion: "",
      dni: "",
      ruc: "",
    });
    setErrors({ dni: '', ruc: '', nombre: '', email: '', telefono: '' });
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
              className={`mt-1 block w-full border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
              required
            />
            {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
              required
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Teléfono</label>
            <input
              type="text" 
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className={`mt-1 block w-full border ${errors.telefono ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
              required
            />
            {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Dirección</label> 
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className={`mt-1 block w-full border ${errors.direccion ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
              required
            />
            {errors.direccion && <p className="text-red-500 text-xs mt-1">{errors.direccion}</p>}
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
              onClick={handleClose}
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
