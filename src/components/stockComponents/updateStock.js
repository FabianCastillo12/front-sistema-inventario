import React, { useState, useEffect } from 'react';

const UpdateStockModal = ({ isOpen, onClose, stockItem, onUpdateStock }) => {
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    precio: '',
    categoria: '',
    catidadStock: ''
  });

  // Actualiza formData cuando stockItem cambia
  useEffect(() => {
    if (stockItem) {
      setFormData({
        id: stockItem.id,
        nombre: stockItem.nombre,
        precio: stockItem.precio, 
        categoria: String(stockItem.categoria.nombre),
        catidadStock: stockItem.catidadStock
      });
    }
  }, [stockItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateStock(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 text-black">
      <div className="modal-content bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Actualizar Stock</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Cantidad</label>
            <input
              type="number"
              name="catidadStock"
              value={formData.catidadStock}
              onChange={handleChange}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStockModal;
