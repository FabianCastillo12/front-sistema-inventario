import React, { useState, useEffect } from "react";

export default function UpdateUserModal({ user, isOpen, onClose, onUpdateUser }) {
  const [formData, setFormData] = useState({ ...user, password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessages, setSuccessMessages] = useState({});

  useEffect(() => {
    setFormData({ ...user, password: "" });
    setConfirmPassword("");
    setErrors({});
    setSuccessMessages({});
  }, [user]);

  const validateNombre = (nombre) => /^[a-zA-Z0-9\s]{1,50}$/.test(nombre);
  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    switch (name) {
      case "nombre":
        if (validateNombre(value)) {
          setErrors((prev) => ({ ...prev, nombre: "" }));
          setSuccessMessages((prev) => ({ ...prev, nombre: "Nombre válido" }));
        } else {
          setErrors((prev) => ({ ...prev, nombre: "El nombre debe tener entre 1 y 50 caracteres y solo puede contener letras, números y espacios." }));
          setSuccessMessages((prev) => ({ ...prev, nombre: "" }));
        }
        break;
      case "email":
        if (validateEmail(value)) {
          setErrors((prev) => ({ ...prev, email: "" }));
          setSuccessMessages((prev) => ({ ...prev, email: "Email válido" }));
        } else {
          setErrors((prev) => ({ ...prev, email: "El email debe tener un formato válido." }));
          setSuccessMessages((prev) => ({ ...prev, email: "" }));
        }
        break;
      case "password":
        if (validatePassword(value)) {
          setErrors((prev) => ({ ...prev, password: "" }));
          setSuccessMessages((prev) => ({ ...prev, password: "Contraseña segura" }));
        } else {
          setErrors((prev) => ({ ...prev, password: "La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y al menos un carácter especial." }));
          setSuccessMessages((prev) => ({ ...prev, password: "" }));
        }
        break;
      default:
        break;
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value === formData.password) {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
      setSuccessMessages((prev) => ({ ...prev, confirmPassword: "Las contraseñas coinciden" }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: "Las contraseñas no coinciden" }));
      setSuccessMessages((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!validateNombre(formData.nombre)) newErrors.nombre = "El nombre debe tener entre 1 y 50 caracteres y solo puede contener letras, números y espacios.";
    if (!validateEmail(formData.email)) newErrors.email = "El email debe tener un formato válido.";
    if (formData.password && !validatePassword(formData.password)) newErrors.password = "La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y al menos un carácter especial.";
    if (formData.password !== confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onUpdateUser(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-[#2A2C39] p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold text-white mb-4">Editar Usuario</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block text-gray-300 text-sm font-medium mb-1">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full border border-gray-600 rounded-md p-2 bg-[#171821] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
            {successMessages.nombre && <p className="text-green-500 text-sm mt-1">{successMessages.nombre}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-600 rounded-md p-2 bg-[#171821] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            {successMessages.email && <p className="text-green-500 text-sm mt-1">{successMessages.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-1">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-600 rounded-md p-2 bg-[#171821] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            {successMessages.password && <p className="text-green-500 text-sm mt-1">{successMessages.password}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-medium mb-1">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full border border-gray-600 rounded-md p-2 bg-[#171821] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            {successMessages.confirmPassword && <p className="text-green-500 text-sm mt-1">{successMessages.confirmPassword}</p>}
          </div>
          <div>
            <label htmlFor="role" className="block text-gray-300 text-sm font-medium mb-1">
              Rol
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-600 rounded-md p-2 bg-[#171821] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-md hover:from-gray-700 hover:to-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-md hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}