// components/UpdateStockModal.js
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const UpdateStockModal = ({ isOpen, onClose, product, onUpdateStock }) => {
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (product) {
      setStock(product.cantidadStock || ""); // Asegúrate de usar `catidadStock`
      console.log("Product loaded for update:", product);
    }
  }, [product]);

  const handleUpdate = async () => {
    if (stock === "") {
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "El stock no puede estar vacío",
        showConfirmButton: true,
      });
      console.log("Stock update failed: Stock field is empty");
      return;
    }

    console.log("Updating stock for product ID:", product.id, "New stock:", stock);

    try {
      await onUpdateStock(product.id, Number(stock)); // Asegúrate de convertir stock a número
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Stock actualizado",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("Stock updated successfully");
      onClose();
    } catch (error) {
      console.error("Error al actualizar el stock:", error);
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al actualizar el stock",
        showConfirmButton: true,
      });
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4">Actualizar Stock</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="stock">
              Cantidad de Stock
            </label>
            <input
              id="stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded-md"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded"
            >
              Cancelar
            </button>
            <button
              onClick={handleUpdate}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
            >
              Actualizar
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default UpdateStockModal;
