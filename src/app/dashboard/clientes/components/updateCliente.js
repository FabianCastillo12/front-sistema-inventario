import React, { useState, useEffect } from "react";

export default function UpdateClienteModal({ 
  cliente, 
  isOpen,
  onClose,
  onUpdateCliente
}) {
  const [formData, setFormData] = useState({ ...cliente });
  const [errors, setErrors] = useState({ dni: '' });
  useEffect(() => {
    setFormData({ ...cliente });
  }, [cliente]);

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
    setFormData({
      ...formData,
      [name]: value,
    });
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
  };

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
    console.log("Cliente actualizado:", formData); 
    onUpdateCliente(formData); 
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-black">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Editar Cliente</h2> {/* Texto adaptado */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Teléfono</label> {/* Nuevo campo */}
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Dirección</label> {/* Nuevo campo */}
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">DNI</label> {/* Nuevo campo */}
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
            <label className="block text-sm font-medium mb-2">RUC</label> 
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