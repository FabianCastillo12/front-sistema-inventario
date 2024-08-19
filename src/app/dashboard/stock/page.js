"use client";
import React, { useEffect, useState } from "react";
import StockList from "@/components/stockComponents/stockList";
import UpdateStockModal from "@/components/stockComponents/updateStock";
import { useStore } from "@/stores/autenticacion";
import Swal from "sweetalert2";

export default function StockPage() {
  const [stock, setStock] = useState([]);
  const user = useStore((state) => state.user);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    console.log("Fetching stock...");
    try {
      const res = await fetch("http://localhost:3010/producto/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!res.ok) {
        console.error("Error fetching stock:", res.statusText);
        return;
      }

      const data = await res.json();
      // Ordenar los productos por ID
      const sortedData = data.sort((a, b) => a.id - b.id);
      setStock(sortedData);
      console.log("Stock fetched and sorted:", sortedData);
    } catch (error) {
      console.error("Error fetching stock:", error);
    }
  };

  const handleUpdateStock = async (productId, newStock) => {
    console.log(
      "Handling stock update for product ID:",
      productId,
      "New stock:",
      newStock
    );
    try {
      const res = await fetch(`http://localhost:3010/producto/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ cantidadStock: newStock }),
      });

      if (res.ok) {
        console.log("Stock update successful");
        // Actualiza solo el producto en el estado
        setStock((prevStock) =>
          prevStock.map((product) =>
            product.id === productId
              ? { ...product, cantidadStock: newStock }
              : product
          )
        );
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Stock actualizado",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const data = await res.json();
        console.error("Error updating stock:", data.message);
        await Swal.fire({
          position: "center",
          icon: "error",
          title: `Error: ${data.message}`,
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const openUpdateModal = (product) => {
    console.log("Opening update modal for product:", product);
    setCurrentProduct(product);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    console.log("Closing update modal");
    setIsUpdateModalOpen(false);
    setCurrentProduct(null);
  };

  return (
    <div className="stock-container p-6 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Stock</h1>
      <StockList stock={stock} onEdit={openUpdateModal} />
      {isUpdateModalOpen && currentProduct && (
        <UpdateStockModal
          isOpen={isUpdateModalOpen}
          onClose={closeUpdateModal}
          product={currentProduct}
          onUpdateStock={handleUpdateStock}
        />
      )}
    </div>
  );
}
