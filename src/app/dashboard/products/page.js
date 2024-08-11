"use client";
import React, { useEffect, useState } from "react";
import ProductTable from "@/components/productsComponents/productsTable";
import { IoAdd } from "react-icons/io5";
import ProductAddModal from "@/components/productsComponents/addProduct";
import { useStore } from "@/stores/autenticacion";


// const initialProducts = [
//   { id: 1, name: 'Producto A', category: 'Categoría 1', price: 29.99, stock: 100 },
//   { id: 2, name: 'Producto B', category: 'Categoría 2', price: 39.99, stock: 50 },
//   // más productos
// ];

export default function ProductsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState(null);
  const  user=useStore((state)=>state.user)
 
 

  useEffect(()=>{
   
   
     traerProducto()
  },[])
 const traerProducto=async()=>{
  try {
    const res = await fetch("http://localhost:3010/producto/", {
      headers: {
          'Authorization': `Bearer ${user.token}`,
      }
  });
  const data=await res.json()
  setProducts(data)
  console.log(data)
  } catch (error) {
    console.log(error)
  }
 }

  const handleAddProduct = (newProduct) => {
    // setProducts([
    //   ...products,
    //   newProduct // El producto ya tiene un ID único generado en el modal
    // ]);
  };

  const handleUpdateProduct = async(updatedProduct) => {
  

    try {
      const res= await fetch(`http://localhost:3010/producto/${productId}`,{
        method:"POST",
        headers: {
            'Authorization': `Bearer ${user.token}`,
        }
    })
      const data=await res.json()
      console.log(data)
     } catch (error) {
      console.log("error")
     }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsAddModalOpen(true);
  };

  const handleDeleteProduct = async (productId) => {
    console.log(productId)
   try {
    const res= await fetch(`http://localhost:3010/producto/${productId}`,{
      method:"DELETE",
      headers: {
          'Authorization': `Bearer ${user.token}`,
      }
  })
    const data=await res.json()
    console.log(data)
   } catch (error) {
    console.log("error")
   }
  };

  return (
    <>
      <div className="user-container">
        <button
          onClick={() => {
            setEditingProduct(null); // Clear the editing product when adding a new product
            setIsAddModalOpen(true);
          }}
          className="absolute bottom-10 right-10 bg-black shadow-lg rounded-full w-12 h-12 flex justify-center items-center"
        >
          <IoAdd size={40} color="white" />
        </button>
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Productos</h1>
        <ProductTable products={products} onEditProduct={handleEditProduct} onDeleteProduct={handleDeleteProduct}  />
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
