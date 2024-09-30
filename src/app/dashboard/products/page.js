"use client";
import React from "react";
import ProductTable from "@/app/dashboard/products/components/productsTable";
import { IoAdd } from "react-icons/io5";
import ProductAddModal from "@/app/dashboard/products/components/addProduct";
import { useProducts } from "@/hooks/useProducts";
import Paginacion from "./components/Paginacion";
import { productStores } from "@/stores/productoStores";
import { useReports } from "@/hooks/useReports";

export default function ProductsPage() {
  const {
    products,
    isAddModalOpen,
    editingProduct,
    setIsAddModalOpen,
    setEditingProduct,
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    categoria,
  } = useProducts();
  const { productPage } = productStores();
  const { generarExcelStock } = useReports();

  return (
    <>
      <div className="">
        <button
          onClick={() => {
            setEditingProduct(null);
            setIsAddModalOpen(true);
          }}
          className="fixed bottom-10 right-10 bg-black shadow-lg rounded-full w-12 h-12 flex justify-center items-center"
        >
          <IoAdd size={40} color="white" />
        </button>
        <h1 className="text-3xl font-semibold text-white mb-6">Productos</h1>
        <ProductTable
          products={productPage}
          onEditProduct={(product) => {
            setEditingProduct(product);
            setIsAddModalOpen(true);
          }}
          categoria={categoria}
          onDeleteProduct={handleDeleteProduct}
          onUpdateProduct={handleUpdateProduct}
        />
        <ProductAddModal
          productos={products}
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddProduct={handleAddProduct}
          onDeleteProduct={handleDeleteProduct}
          product={editingProduct}
        />
        <div className="flex justify-center items-center">
          <button
            onClick={generarExcelStock}
            className="bg-[#006400] text-white text-xs px-2 py-2 rounded-md whitespace-nowrap mt-2" 
          >
            Exportar en Excel
          </button>
          <Paginacion products={products} />
        </div>
      </div>
    </>
  );
}
