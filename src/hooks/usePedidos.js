import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

export function usePedidos() {
  const [pedidos, setPedidos] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.token) {
      fetchPedidos();
    }
  }, [session]);

  const fetchPedidos = async () => {
    try {
      const res = await fetch("http://localhost:3010/pedidos/", {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      });

      if (!res.ok) {
        console.error("Error fetching clientes:", res.statusText);
        return;
      }

      const data = await res.json();
      setPedidos(data.sort((a, b) => a.id - b.id));
    } catch (error) {
      console.error("Error fetching pedidos:", error);
    }
  };

  const handleAddOrder = async (newOrder) => {
    try {
      const res = await fetch("http://localhost:3010/pedidos/crear", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });
      const data = await res.json();

      if (res.ok) {
        await fetchPedidos();
        setIsAddModalOpen(false);
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Order agregado",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("Error al agregar el Order:", data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    const orderToDelete = orders.find((order) => order.id === orderId);
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `Se eliminará el pedido ${orderToDelete.name}. Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3010/orders/${orderId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        });

        if (res.ok) {
          setOrders((prevOrders) =>
            prevOrders.filter((order) => order.id !== orderId)
          );
          await Swal.fire({
            position: "center",
            icon: "success",
            title: "Order eliminado",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          const errorData = await res.json();
          console.error("Error al eliminar el Order:", errorData.message);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  };

  return {
    pedidos,
    handleAddOrder,
    handleDeleteOrder,
  };
}
