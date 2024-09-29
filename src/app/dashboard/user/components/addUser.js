"use client";
import React, { useState } from "react";

// Validaciones con regex
const validateNombre = (nombre) => /^[a-zA-Z0-9\s]{1,50}$/.test(nombre);
const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
const validatePassword = (password) => /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);

const AddUserModal = ({ isOpen, onClose, onAddUser }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confir_password: "",
    role: "user",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    email: "",
    password: "",
    confir_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validar campos
    switch (name) {
      case "nombre":
        setErrors((prevErrors) => ({
          ...prevErrors,
          nombre: validateNombre(value)
            ? ""
            : "El nombre debe tener entre 1 y 50 caracteres y solo puede contener letras, números y espacios.",
        }));
        break;
      case "email":
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: validateEmail(value) ? "" : "El email debe tener un formato válido.",
        }));
        break;
      case "password":
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: validatePassword(value)
            ? ""
            : "La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra y un número.",
        }));
        break;
      case "confir_password":
        setErrors((prevErrors) => ({
          ...prevErrors,
          confir_password: value === formData.password ? "" : "La contraseña y la confirmación de contraseña deben coincidir.",
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = { nombre: "", email: "", password: "", confir_password: "" };

    if (!validateNombre(formData.nombre)) {
      newErrors.nombre = "Nombre debe tener entre 1 y 50 caracteres y solo puede contener letras, números y espacios.";
      valid = false;
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = "Email debe tener un formato válido.";
      valid = false;
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = "Contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra y un número.";
      valid = false;
    }
    if (formData.password !== formData.confir_password) {
      newErrors.confir_password = "La contraseña y la confirmación de contraseña deben coincidir.";
      valid = false;
    }

    if (valid) {
      onAddUser(formData);
      setFormData({
        nombre: "",
        email: "",
        password: "",
        confir_password: "",
        role: "user",
      });
      onClose();
    } else {
      setErrors(newErrors);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-black z-50">
      <div className="bg-[#2A2C39] p-6 rounded-lg shadow-lg max-w-sm w-full divide-y divide-[#3D4059]">
        <h2 className="text-lg font-semibold text-white mb-4">Agregar Usuario</h2>
        <form onSubmit={handleSubmit}>
          {/* Campos de entrada */}
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-300 text-sm font-medium mb-2">Nombre</label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-md p-2 bg-[#171821] text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-md p-2 bg-[#171821] text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Contraseña */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">Contraseña</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-md p-2 bg-[#171821] text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Confirmar Contraseña */}
          <div className="mb-4">
            <label htmlFor="confir_password" className="block text-gray-300 text-sm font-medium mb-2">Confirmar Contraseña</label>
            <input
              type="password"
              name="confir_password"
              id="confir_password"
              value={formData.confir_password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-md p-2 bg-[#171821] text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {errors.confir_password && <p className="text-red-500 text-sm">{errors.confir_password}</p>}
          </div>

          {/* Rol */}
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-300 text-sm font-medium mb-2">Rol</label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-md p-2 bg-[#171821] text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <div className="flex justify-end mt-4">
            <button type="button" onClick={onClose} className="bg-gradient-to-r from-gray-600 to-gray-800 text-white py-2 px-6 rounded-full shadow-md hover:from-gray-700 hover:to-gray-900 mr-4">
              Cancelar
            </button>
            <button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-6 rounded-full shadow-md hover:from-blue-600 hover:to-blue-800">
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;