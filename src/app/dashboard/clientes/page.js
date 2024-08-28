"use client";
import ClienteComponent from "@/app/dashboard/clientes/components/clienteComponent";
import { IoAdd } from "react-icons/io5";
import UpdateClienteModal from "@/app/dashboard/clientes/components/updateCliente";
import { useEffect, useState } from "react";
import { useStore } from "@/stores/autenticacion";
import AddClienteModal from "@/app/dashboard/clientes/components/addCliente";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

export default function ClientePage() {
  const { data: session, status } = useSession();
  const [clientes, setClientes] = useState([]);
  const user = useStore((state) => state.user);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    traerClientes();
  }, []);

  const traerClientes = async () => {
    try {
      const res = await fetch("http://localhost:3010/clientes/", {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      });
      const data = await res.json();
      const sortedData = data.sort((a, b) => a.id - b.id);
      setClientes(sortedData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCliente = async (updatedCliente) => {
    const { id, ...clienteData } = updatedCliente;
    try {
      const res = await fetch(`http://localhost:3010/clientes/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clienteData),
      });

      if (res.ok) {
        await traerClientes();
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
        console.error("Error al actualizar el usuario:", errorData.message);
        await Swal.fire({
          position: "center",
          icon: "error",
          title: "Error al actualizar el usuario",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleDeleteCliente = async (clienteId) => {
    const clienteToDelete = clientes.find(
      (cliente) => cliente.id === clienteId
    );

    if (!clienteToDelete) {
      console.error("Cliente no encontrado");
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
            Authorization: `Bearer ${user.token}`,
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
          console.error("Error al eliminar el cliente:", errorData.message);
          await Swal.fire({
            position: "center",
            icon: "error",
            title: "Error al eliminar el cliente",
            text: errorData.message,
          });
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
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
    const res = await fetch("http://localhost:3010/clientes/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCliente),
    });
    const data = await res.json();

    if (res.ok) {
      await traerClientes();
      setIsAddModalOpen(false);
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Cliente agregado",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      console.error("Error al agregar el producto:", data.message);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="user-container">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="fixed bottom-10 right-10 bg-black shadow-lg rounded-full w-12 h-12 flex justify-center items-center"
        >
          <IoAdd size={40} color="white" />
        </button>
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Clientes</h1>
        <ClienteComponent
          clientes={clientes}
          onEditCliente={(cliente) => {
            setSelectedCliente(cliente);
            setIsEditModalOpen(true);
          }}
          onDeleteCliente={handleDeleteCliente}
        />
        <AddClienteModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddCliente={handleAddCliente}
        />
        {isEditModalOpen && selectedCliente && (
          <UpdateClienteModal
            cliente={selectedCliente}
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onUpdateCliente={handleUpdateCliente}
          />
        )}
      </div>
    </>
  );
}
