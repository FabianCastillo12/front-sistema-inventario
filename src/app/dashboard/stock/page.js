"use client";
import React from "react";
import StockList from "@/app/dashboard/stock/components/stockList";
import UpdateStockModal from "@/app/dashboard/stock/components/updateStock";
import { useStock } from "@/hooks/useStock";

export default function StockPage() {
  const {
    stock,
    isUpdateModalOpen,
    currentProduct,
    openUpdateModal,
    closeUpdateModal,
    handleUpdateStock,
  } = useStock();

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
