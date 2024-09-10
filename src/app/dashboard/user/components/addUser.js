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
          nombre: validateNombre(value) ? "" : "El nombre debe tener entre 1 y 50 caracteres y solo puede contener letras, números y espacios.",
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
          password: validatePassword(value) ? "" : "La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra y un número.",
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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-black">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Agregar Usuario</h2>
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
            {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
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
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirmar Contraseña</label>
            <input
              type="password"
              name="confir_password"
              value={formData.confir_password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
            {errors.confir_password && <p className="text-red-500 text-sm">{errors.confir_password}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Rol</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
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

export default AddUserModal;
