import React, { useState, useEffect } from "react";

export default function UpdateClienteModal({
  cliente,
  isOpen,
  onClose,
  onUpdateCliente,
}) {
  const [formData, setFormData] = useState({ ...cliente });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (cliente) {
      setFormData({ ...cliente });
    }
  }, [cliente]);

  // Validaciones
  const validateDNI = (dni) => /^\d{8}$/.test(dni);
  const validateRUC = (ruc) => /^(10|20)\d{9}$/.test(ruc);
  const validateNombre = (nombre) => /^[a-zA-Z\s]{1,20}$/.test(nombre);
  const validateEmail = (email) => 
    /^[a-zA-Z0-9._-]{1,50}@[a-zA-Z0-9.-]{1,50}\.[a-zA-Z]{2,}$/.test(email);
  const validateTelefono = (telefono) => /^\d{9,15}$/.test(telefono);
  const validateDireccion = (direccion) =>
    /^[a-zA-Z0-9\s.,#-]{1,50}$/.test(direccion);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validación para cada campo
    if (name === "dni" && !validateDNI(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        dni: "El DNI debe tener 8 dígitos numéricos.",
      }));
    } else if (name === "ruc" && !validateRUC(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ruc: "Formato de RUC incorrecto. Debe tener 11 dígitos, comenzando con 10 o 20.",
      }));
    } else if (name === "nombre" && !validateNombre(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nombre: "El nombre debe contener solo letras y espacios.",
      }));
    } else if (name === "email" && !validateEmail(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Formato de correo electrónico inválido.",
      }));
    } else if (name === "telefono" && !validateTelefono(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        telefono: "El teléfono debe tener entre 9 y 15 dígitos.",
      }));
    } else if (name === "direccion" && !validateDireccion(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        direccion: "La dirección contiene caracteres inválidos.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "", // Limpiar el error si la validación es correcta
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar todos los campos antes de enviar
    if (
      !validateDNI(formData.dni) ||
      !validateRUC(formData.ruc) ||
      !validateNombre(formData.nombre) ||
      !validateEmail(formData.email) ||
      !validateTelefono(formData.telefono) ||
      !validateDireccion(formData.direccion)
    ) {
      // Si hay algún error, no enviar el formulario
      return;
    }

    onUpdateCliente(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-black">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Editar Cliente</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full border ${
                errors.nombre ? "border-red-500" : "border-gray-300"
              } rounded p-2`}
              required
            />
            {errors.nombre && (
              <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded p-2`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className={`w-full border ${
                errors.telefono ? "border-red-500" : "border-gray-300"
              } rounded p-2`}
              required
            />
            {errors.telefono && (
              <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className={`w-full border ${
                errors.direccion ? "border-red-500" : "border-gray-300"
              } rounded p-2`}
              required
            />
            {errors.direccion && (
              <p className="text-red-500 text-xs mt-1">{errors.direccion}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">DNI</label>
            <input
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              className={`w-full border ${
                errors.dni ? "border-red-500" : "border-gray-300"
              } rounded p-2`}
              required
            />
            {errors.dni && (
              <p className="text-red-500 text-xs mt-1">{errors.dni}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">RUC</label>
            <input
              type="text"
              name="ruc"
              value={formData.ruc}
              onChange={handleChange}
              className={`w-full border ${
                errors.ruc ? "border-red-500" : "border-gray-300"
              } rounded p-2`}
              required
            />
            {errors.ruc && (
              <p className="text-red-500 text-xs mt-1">{errors.ruc}</p>
            )}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
