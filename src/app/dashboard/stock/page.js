"use client";
import { useEffect, useState } from 'react';
import StockList from '@/components/stockComponents/stockList';
import UpdateStockModal from '@/components/stockComponents/updateStock';
import { useStore } from '@/stores/autenticacion';

export default function StockPage() {
  const [stock, setStock] = useState("");
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
  setStock(data)
  console.log(data)
  } catch (error) {
    console.log(error)
  }
 }
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // Maneja la actualización del stock
  const handleUpdateStock = (updatedItem) => {
    setStock(stock.map(item => (item.id === updatedItem.id ? updatedItem : item)));
    setIsUpdateModalOpen(false);
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
