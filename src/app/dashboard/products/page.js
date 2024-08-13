"use client";
import React, { useEffect, useState } from "react";
import ProductTable from "@/components/productsComponents/productsTable";
import { IoAdd } from "react-icons/io5";
import ProductAddModal from "@/components/productsComponents/addProduct";
import { useStore } from "@/stores/autenticacion";
import Swal from "sweetalert2";

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
        await traerProducto();
        setIsAddModalOpen(false);
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Producto agregado",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("Error al agregar el producto:", data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleUpdateProduct = async (formData) => {
    try {
      const datos = { nombre: formData.nombre, precio: Number(formData.precio), categoria: formData.categoria }
      console.log(datos)
      const res = await fetch(`http://localhost:3010/producto/${formData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(datos),
      })
      const data = await res.json()
      console.log(data)

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
      console.log(error)
    } 
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsAddModalOpen(true);
  };

  const handleDeleteProduct = async (productId) => {
    const prodcutToDelete = products.find((product) => product.id === productId);
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `Se eliminará el producto ${prodcutToDelete.name}. Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
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
    }
    
  };

  return (
    <>
      <div className="stock-container p-6  bg-white rounded-md shadow-md">
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