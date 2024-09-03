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
  const { pedidos, handleAddOrder, handleDeleteOrder } = usePedidos();
  console.log(pedidos);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [orders, setOrders] = useState([]); 
  const user = useStore((state) => state.user);
  const { data: session, status } = useSession();

  const handleUpdateOrder = async (formData) => {
    // **COMENTADO POR AHORA - IMPLEMENTAR MÁS ADELANTE**
    // try {
    //   const res = await fetch(`http://localhost:3010/orders/${formData.id}`, { // Endpoint a modificar
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${session.user.token}`,
    //     },
    //     body: JSON.stringify(formData), 
    //   });
    //   const data = await res.json();
    //   console.log(data);

    //   if (res.ok) {
    //     await traerOrders(); 
    //     await Swal.fire({
    //       position: "center",
    //       icon: "success",
    //       title: "Order actualizado",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //   } else {
    //     console.error("Error al modificar el Order:", data.message);
    //     await Swal.fire({
    //       position: "center",
    //       icon: "error",
    //       title: "Error al actualizar el Order",
    //       showConfirmButton: true,
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setIsAddModalOpen(true);
  };



// Función para manejar el botón "Ver" (por ahora vacía)

const handleViewOrder = (order) => {
  // Implementaremos la lógica aquí más adelante para pedidos
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
          onEditOrder={handleEditOrder}
          onDeleteOrder={handleDeleteOrder}
          onUpdateOrder={handleUpdateOrder} 
          onViewOrder={handleViewOrder} 
        />
        <OrderAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddOrder={handleAddOrder} 
          onDeleteOrder={handleDeleteOrder} 
          order={editingOrder} 
        />
      </div>
    </>
  );
}