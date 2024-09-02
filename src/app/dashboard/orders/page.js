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
  const { pedidos } = usePedidos();
  console.log(pedidos);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [orders, setOrders] = useState([]); 
  const user = useStore((state) => state.user);
  const { data: session, status } = useSession();

  useEffect(() => {
    // Lógica para obtener la información de pedidos del backend (endpoint /orders)
    // **COMENTADO POR AHORA - IMPLEMENTAR MÁS ADELANTE**
    // const traerOrders = async () => {
    //   try {
    //     const res = await fetch("http://localhost:3010/orders/", { 
    //       headers: {
    //         Authorization: `Bearer ${session.user.token}`,
    //       },
    //     });
    //     const data = await res.json();
    //     // Ordenar los pedidos por ID
    //     const sortedData = data.sort((a, b) => a.id - b.id);
    //     setOrders(sortedData);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // traerOrders();






    // Simulación de datos de pedidos desde el backend
    const simulatedOrders = [
      { 
        id: 1, 
        fecha: "2023-10-27 10:00", 
        cliente: "Juan Pérez", 
        email: "juan.perez@email.com", // Nuevo campo
        telefono: "123-456-7890", // Nuevo campo
        direccion: "Calle Principal 123", // Nuevo campo
        total: 100.00, 
        estado: "Completado" 
      },
      { 
        id: 2, 
        fecha: "2023-10-27 12:30", 
        cliente: "Maria González", 
        email: "maria.gonzalez@email.com", // Nuevo campo
        telefono: "987-654-3210", // Nuevo campo
        direccion: "Avenida Secundaria 456", // Nuevo campo
        total: 50.00, 
        estado: " Pendiente" 
      },
    ];
    setOrders(simulatedOrders); 
  }, []);

  const handleAddOrder = async (newOrder) => {
    // **COMENTADO POR AHORA - IMPLEMENTAR MÁS ADELANTE**
    // try {
    //   const res = await fetch("http://localhost:3010/orders/crear", { // Endpoint a modificar
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${session.user.token}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(newOrder),
    //   });
    //   const data = await res.json();
      
    //   if (res.ok) {
    //     await traerOrders();
    //     setIsAddModalOpen(false);
    //     await Swal.fire({
    //       position: "center",
    //       icon: "success",
    //       title: "Order agregado",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //   } else {
    //     console.error("Error al agregar el Order:", data.message);
    //   }
    // } catch (error) {
    //   console.error("Error en la solicitud:", error);
    // }
  };




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

  const handleDeleteOrder = async (orderId) => {
    // **COMENTADO POR AHORA - IMPLEMENTAR MÁS ADELANTE**
    // const orderToDelete = orders.find((order) => order.id === orderId);
    // const result = await Swal.fire({
    //   title: "¿Estás seguro?",
    //   text: `Se eliminará el pedido ${orderToDelete.name}. Esta acción no se puede deshacer.`, // Modificar texto
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Sí, eliminar",
    //   cancelButtonText: "Cancelar",
    // });
    // if (result.isConfirmed) {
    //   try {
    //     const res = await fetch(`http://localhost:3010/orders/${orderId}`, { // Endpoint a modificar
    //       method: "DELETE",
    //       headers: {
    //         Authorization: `Bearer ${session.user.token}`,
    //       },
    //     });

    //     if (res.ok) {
    //       setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    //       await Swal.fire({
    //         position: "center",
    //         icon: "success",
    //         title: "Order eliminado",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //     } else {
    //       const errorData = await res.json();
    //       console.error("Error al eliminar el Order:", errorData.message);
    //     }
    //   } catch (error) {
    //     console.error("Error en la solicitud:", error);
    //   }
    // }
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
          onViewOrder={handleViewOrder} // **NUEVA LÍNEA**
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