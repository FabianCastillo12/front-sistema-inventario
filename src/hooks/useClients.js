import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

export function useClientes() {
  const [clientes, setClientes] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.token) {
      fetchClientes();
    }
  }, [session]);

  const fetchClientes = async () => {
    try {
      const res = await fetch("http://localhost:3010/clientes/", {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      });

      if (!res.ok) {
        console.error("Error fetching clientes:", res.statusText);
        return;
      }

      const data = await res.json();
      setClientes(data.sort((a, b) => a.id - b.id));
    } catch (error) {
      console.error("Error fetching clientes:", error);
    }
  };

  const handleUpdateCliente = async (updatedCliente) => {
    const { id, ...clienteData } = updatedCliente;
    try {
      const res = await fetch(`http://localhost:3010/clientes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.token}`,
        },
        body: JSON.stringify(clienteData),
      });
      console.log("Cliente actualizado:", updatedCliente);
      if (res.ok) {
        await fetchClientes();
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Cliente actualizado",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsEditModalOpen(false);
      } else {
        const errorData = await res.json();
        console.error("Error updating cliente:", errorData.message);
        await Swal.fire({
          position: "center",
          icon: "error",
          title: "Error al actualizar el cliente",
          text: errorData.message,
        });
      }
    } catch (error) {
      console.error("Error in request:", error);
    }
  };

  const handleDeleteCliente = async (clienteId) => {
    const clienteToDelete = clientes.find((cliente) => cliente.id === clienteId);

    if (!clienteToDelete) {
      console.error("Cliente not found");
      return;
    }

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `Se eliminará el cliente ${clienteToDelete.nombre}. Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3010/clientes/${clienteId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        });

        if (res.ok) {
          setClientes((prevClients) =>
            prevClients.filter((cliente) => cliente.id !== clienteId)
          );
          await Swal.fire({
            position: "center",
            icon: "success",
            title: "Cliente eliminado",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          const errorData = await res.json();
          console.error("Error deleting cliente:", errorData.message);
          await Swal.fire({
            position: "center",
            icon: "error",
            title: "Error al eliminar el cliente",
            text: "El cliente no pudo ser eliminado, tiene un pedido asociado.",
          });
        }
      } catch (error) {
        console.error("Error in request:", error);
        await Swal.fire({
          position: "center",
          icon: "error",
          title: "Error en la solicitud",
          text: error.message,
        });
      }
    }
  };

  const handleAddCliente = async (newCliente) => {
    try {
      const res = await fetch("http://localhost:3010/clientes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.token}`,
        },
        body: JSON.stringify(newCliente),
      });

      if (res.ok) {
        await fetchClientes();
        setIsAddModalOpen(false);
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Cliente agregado",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const data = await res.json();
        console.error("Error adding cliente:", data.message);
      }
    } catch (error) {
      console.error("Error in request:", error);
    }
  };

  return {
    clientes,
    isEditModalOpen,
    selectedCliente,
    isAddModalOpen,
    openEditModal: (cliente) => {
      setSelectedCliente(cliente);
      console.log("cliente", cliente);
      setIsEditModalOpen(true);
    },
    closeEditModal: () => {
      setIsEditModalOpen(false);
      setSelectedCliente(null);
    },
    openAddModal: () => setIsAddModalOpen(true),
    closeAddModal: () => setIsAddModalOpen(false),
    handleUpdateCliente,
    handleDeleteCliente,
    handleAddCliente,
  };
}
