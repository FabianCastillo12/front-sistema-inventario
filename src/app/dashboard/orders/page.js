"use client";
import React, { useEffect, useState } from "react";
import OrdersTable from "@/app/dashboard/orders/components/ordersTable";
import { IoAdd } from "react-icons/io5";
import OrderAddModal from "@/app/dashboard/orders/components/addOrder";
import { useStore } from "@/stores/autenticacion";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { usePedidos } from "@/hooks/usePedidos"

export default function OrdersPage() {
  const { pedidos, handleAddOrder, handleDeleteOrder, handleUpdateOrder } = usePedidos();
  console.log(pedidos);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [orders, setOrders] = useState([]); 
  const user = useStore((state) => state.user);
  const { data: session, status } = useSession();

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setIsAddModalOpen(true);
  };

  return (
    <>
      <div className="stock-container p-6  bg-white rounded-md shadow-md">
        <button
          onClick={() => {
            setEditingOrder(null);
            setIsAddModalOpen(true);
          }}
          className="fixed bottom-10 right-10 bg-black shadow-lg rounded-full w-12 h-12 flex justify-center items-center"
        >
          <IoAdd size={40} color="white" />
        </button>
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Pedidos</h1>
        <OrdersTable
          orders={pedidos} 
          onEditOrder={handleUpdateOrder}
          onDeleteOrder={handleDeleteOrder}
          onUpdateOrder={handleUpdateOrder} 
        />
        <OrderAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddOrder={handleAddOrder} 
        />
      </div>
    </>
  );
}