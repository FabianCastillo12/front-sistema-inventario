"use client";
import ClienteComponent from "@/components/clienteComponents/clienteComponent";
import { IoAdd } from "react-icons/io5";
import UpdateClienteModal from "@/components/clienteComponents/updateCliente";
import { useEffect, useState } from "react";
import { useStore } from "@/stores/autenticacion";
import AddClienteModal from "@/components/clienteComponents/addCliente";

export default function ClientePage() {
  const user = useStore((state) => state.user);
  const [clientes, setClientes] = useState([]); //Comentado por el momento para usar datos de ejemplo de cliente----
  console.log(clientes);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Aquí va la declaración de clientes de ejmplo:
  // const [clientes, setClientes] = useState([
  //  { id: 1, nombre: 'Cliente 1', email: 'cliente1@example.com', telefono: '123-456-7890', direccion: 'Dirección 1' },
  //  { id: 2, nombre: 'Cliente 2', email: 'cliente2@example.com', telefono: '987-654-3210', direccion: 'Dirección 2' },
  // ]);

  useEffect(() => {
    setIsMounted(true);
    //traerClientes(); // Comentado por ahora
  }, []);

  /*  const traerClientes = async () => { // Comentado por ahora
    try {
      const res = await fetch("http://localhost:3010/cliente/", { 
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      const sortedData = data.sort((a, b) => a.id - b.id);
      setClientes(sortedData);
    } catch (error) {
      console.log(error);
    }
  }; */

  if (user.rol !== "admin") {
    return null;
  }

  /*  const handleUpdateCliente = async (updatedCliente) => { // Comentado por ahora
    const { id, ...clienteData } = updatedCliente; 
    try {
      const res = await fetch(`http://localhost:3010/cliente/${id}`, { 
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clienteData),
      });

      if (res.ok) {
        await traerClientes();

        // ... (código Swal.fire) ...

        setIsEditModalOpen(false);
      } else {
        const errorData = await res.json();
        console.error("Error al actualizar el cliente:", errorData.message); 
        // ... (código Swal.fire) ...
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }; */

  /*  const handleDeleteUser = async (clienteId) => { // Comentado por ahora
    const clienteToDelete = clientes.find((cliente) => cliente.id === clienteId); 

    if (!clienteToDelete) return;

    // ... (código Swal.fire) ...

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3010/cliente/${clienteId}`, { 
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (res.ok) {
          setClientes(clientes.filter((cliente) => cliente.id !== clienteId)); 
          // ... (código Swal.fire) ...
        } else {
          const errorData = await res.json();
          console.error("Error al eliminar el cliente:", errorData.message); 
          // ... (código Swal.fire) ...
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  }; */

  /*  const handleAddUser = async (newCliente) => { // Comentado por ahora
    const res = await fetch("http://localhost:3010/cliente/", { 
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCliente),
    });
    const data = await res.json();

    if (data) {
      setClientes((prevClientes) => [...prevClientes, data]); 
      // ... (código Swal.fire) ...
      setIsAddModalOpen(false);
    }
  }; */

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
          // onDeleteCliente={handleDeleteCliente}
        />
        <AddClienteModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          // onAddCliente={handleAddCliente}
        />
        {isEditModalOpen &&
          selectedCliente && ( // Descomentado
            <UpdateClienteModal
              cliente={selectedCliente}
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              // onUpdateCliente={handleUpdateCliente}  // Mantén esto comentado
            />
          )}
      </div>
    </>
  );
}
