"use client";
import React from "react";
import StockList from "@/app/dashboard/stock/components/stockList";
import UpdateStockModal from "@/app/dashboard/stock/components/updateStock";
import { useStock } from "@/hooks/useStock";
import Paginacion from "../products/components/Paginacion";
import { productStores } from "@/stores/productoStores";

export default function StockPage() {
  const {
    stock,
    isUpdateModalOpen,
    currentProduct,
    openUpdateModal,
    closeUpdateModal,
    handleUpdateStock,
  } = useStock();
  const {productPage}=productStores()

  return (
    <div className="stock-container p-6 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Stock</h1>
      <StockList stock={productPage} onEdit={openUpdateModal} />
      {isUpdateModalOpen && currentProduct && (
        <UpdateStockModal
          isOpen={isUpdateModalOpen}
          onClose={closeUpdateModal}
          product={currentProduct}
          onUpdateStock={handleUpdateStock}
        />
      )}
      <Paginacion products={stock}/>
    </div>
  );
}
