import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { useStock } from "./useStock";

export function usePedidos() {
  const [pedidos, setPedidos] = useState([]);
  const { data: session } = useSession();
  const { stock, handleUpdateStock } = useStock();
  const [originalOrderState, setOriginalOrderState] = useState({});

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
        console.error("Error fetching pedidos:", res.statusText);
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
        await updateAddOrderStock(newOrder);
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Pedido agregado",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("Error al agregar el pedido:", data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const updateAddOrderStock = async (order) => {
    for (const detalle of order.detalles) {
      const productoId = detalle.productoId;
      const cantidadRestarStock = detalle.cantidad;
      const productoStock = stock.find((product) => product.id === productoId).cantidadStock;
      handleUpdateStock(productoId, productoStock - cantidadRestarStock);
    }
  };

  const updateDeleteOrderStock = async (order) => {
    console.log(order);
    for (const detalle of order.detallePedidos) {
      const productoId = detalle.producto.id;
      const cantidadSumarStock = detalle.cantidad;
      const productoStock = stock.find((product) => product.id === productoId).cantidadStock;
      handleUpdateStock(productoId, productoStock + cantidadSumarStock);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    const orderToDelete = pedidos.find((order) => order.id === orderId);
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `Se eliminará el pedido ${orderToDelete.id}. Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3010/pedidos/${orderId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        });

        if (res.ok) {
          await updateDeleteOrderStock(orderToDelete);
          setPedidos((prevOrders) =>
            prevOrders.filter((order) => order.id !== orderId)
          );
          await Swal.fire({
            position: "center",
            icon: "success",
            title: "Pedido eliminado",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          const errorData = await res.json();
          console.error("Error al eliminar el pedido:", errorData.message);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  };

  const handleUpdateOrder = async (formData, idOrder) => {
    try {
      // Fetch the original order before updating
      const originalOrderRes = await fetch(`http://localhost:3010/pedidos/${idOrder}`, {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      });
      const originalOrder = await originalOrderRes.json();
      setOriginalOrderState(originalOrder);

      const res = await fetch(`http://localhost:3010/pedidos/${idOrder}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        await updateOrderStock(originalOrder, formData);
        await fetchPedidos();
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Pedido actualizado",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("Error al actualizar el pedido:", data.message);
        await Swal.fire({
          position: "center",
          icon: "error",
          title: "Error al actualizar el pedido",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrderStock = async (originalOrder, updatedOrder) => {
    // Compare the original and updated orders to adjust the stock
    const originalDetalles = originalOrder.detalles || [];
    const updatedDetalles = updatedOrder.detalles || [];

    // Create maps for quick lookup
    const originalMap = new Map(originalDetalles.map(d => [d.productoId, d.cantidad]));
    const updatedMap = new Map(updatedDetalles.map(d => [d.productoId, d.cantidad]));

    // Iterate over all products to check if stock needs to be updated
    for (const [productoId, originalCantidad] of originalMap) {
      const updatedCantidad = updatedMap.get(productoId) || 0;
      const cantidadDiferencia = updatedCantidad - originalCantidad;

      if (cantidadDiferencia !== 0) {
        const productoStock = stock.find((product) => product.id === productoId).cantidadStock;
        handleUpdateStock(productoId, productoStock - cantidadDiferencia);
      }
    }

    // Handle new products added to the order
    for (const [productoId, updatedCantidad] of updatedMap) {
      if (!originalMap.has(productoId)) {
        const productoStock = stock.find((product) => product.id === productoId).cantidadStock;
        handleUpdateStock(productoId, productoStock - updatedCantidad);
      }
    }
  };

  return {
    pedidos,
    handleAddOrder,
    handleDeleteOrder,
    handleUpdateOrder
  };
}
