"use client";
import React from "react";
import ProductTable from "@/app/dashboard/products/components/productsTable";
import { IoAdd } from "react-icons/io5";
import ProductAddModal from "@/app/dashboard/products/components/addProduct";
import { useProducts } from "@/hooks/useProducts";

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
    categoria
  } = useProducts();

  return (
    <>
      <div className="stock-container p-6 bg-white rounded-md shadow-md">
        <button
          onClick={() => {
            setEditingProduct(null);
            setIsAddModalOpen(true);
          }}
          className="fixed bottom-10 right-10 bg-black shadow-lg rounded-full w-12 h-12 flex justify-center items-center"
        >
          <IoAdd size={40} color="white" />
        </button>
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Productos</h1>
        <ProductTable
          products={products}
          onEditProduct={(product) => {
            setEditingProduct(product);
            setIsAddModalOpen(true);

          }}
          categoria={categoria}
          onDeleteProduct={handleDeleteProduct}
          onUpdateProduct={handleUpdateProduct}
        />
        <ProductAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddProduct={handleAddProduct}
          onDeleteProduct={handleDeleteProduct}
          product={editingProduct}
        />
      </div>
    </>
  );
}
