"use client";
import React, { useEffect, useState } from "react";
import ProductTable from "@/components/productsComponents/productsTable";
import { IoAdd } from "react-icons/io5";
import ProductAddModal from "@/components/productsComponents/addProduct";
import { useStore } from "@/stores/autenticacion";

export default function ProductsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
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
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const res = await fetch("http://localhost:3010/producto/crear", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: newProduct.nombre,
          precio: newProduct.precio,
          cantidadStock: newProduct.cantidadStock,
          unidad_medida: newProduct.unidad_medida,
          estado: newProduct.estado
        }),
      });
      const data = await res.json();
  
      if (res.ok) {
        setProducts((prevProducts) => [...prevProducts, data]);
        setIsAddModalOpen(false);
      } else {
        console.error("Error al agregar el producto:", data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const res = await fetch(`http://localhost:3010/producto/${updatedProduct.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();

      if (res.ok) {
        // Actualiza el estado con los datos actualizados
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === updatedProduct.id ? data : product
          )
        );
        setIsAddModalOpen(false);
      } else {
        console.error("Error al actualizar el producto:", data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsAddModalOpen(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const res = await fetch(`http://localhost:3010/producto/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      } else {
        const errorData = await res.json();
        console.error("Error al eliminar el producto:", errorData.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <>
      <div className="user-container">
        <button
          onClick={() => {
            setEditingProduct(null);
            setIsAddModalOpen(true);
          }}
          className="absolute bottom-10 right-10 bg-black shadow-lg rounded-full w-12 h-12 flex justify-center items-center"
        >
          <IoAdd size={40} color="white" />
        </button>
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Productos</h1>
        <ProductTable
          products={products}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
        />
        <ProductAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          product={editingProduct}
        />
      </div>
    </>
  );
}