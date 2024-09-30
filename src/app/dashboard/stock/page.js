"use client";
import React from "react";
import StockList from "@/app/dashboard/stock/components/stockList";
import UpdateStockModal from "@/app/dashboard/stock/components/updateStock";
import { useStock } from "@/hooks/useStock";
import { useReports } from "@/hooks/useReports";
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
  const { generarExcelStock } = useReports();
  const { productPage } = productStores();

  return (
    <div className="">
      <h1 className="text-3xl font-semibold text-white mb-6">Stock</h1>
      <StockList stock={productPage} onEdit={openUpdateModal} />
      {isUpdateModalOpen && currentProduct && (
        <UpdateStockModal
          isOpen={isUpdateModalOpen}
          onClose={closeUpdateModal}
          product={currentProduct}
          onUpdateStock={handleUpdateStock}
        />
      )}
      <div className="flex justify-center items-center">
        <button
          onClick={generarExcelStock}
          className="bg-[#006400] text-white text-xs px-2 py-2 rounded-md whitespace-nowrap mt-2"
        >
          Exportar en Excel
        </button>
        <Paginacion products={stock} />
      </div>
    </div>
  );
}
