"use client";
import { useEffect, useState } from "react";
import StockList from "@/components/stockComponents/stockList";
import UpdateStockModal from "@/components/stockComponents/updateStock";
import { useStore } from "@/stores/autenticacion";
import Swal from "sweetalert2";

export default function StockPage() {
  const [stock, setStock] = useState("");
  const user = useStore((state) => state.user);
  useEffect(() => {
    traerProducto();
  }, []);
  const traerProducto = async () => {
    try {
      const res = await fetch("http://localhost:3010/producto/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      setStock(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // Maneja la actualización del stock
  const handleUpdateStock = async (formData) => {
    try {
      const datos = {
        nombre: formData.nombre,
        precio: Number(formData.precio),
        categoria: formData.categoria,
      };
      console.log(datos);
      const res = await fetch(`http://localhost:3010/producto/${formData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(datos),
      });
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        await traerProducto();
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Producto actualizado",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("Error al modificar el producto:", data.message);
        await Swal.fire({
          position: "center",
          icon: "error",
          title: "Error al actualizar el producto",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openUpdateModal = (item) => {
    setCurrentItem(item);
    setIsUpdateModalOpen(true);
  };

  return (
    <div className="stock-container p-6  bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Stock</h1>
      <StockList stock={stock} onEdit={openUpdateModal} />
      {isUpdateModalOpen && currentItem && (
        <UpdateStockModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          stockItem={currentItem}
          onUpdateStock={handleUpdateStock}
        />
      )}
    </div>
  );
}
