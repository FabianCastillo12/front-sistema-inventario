"use client";
import React from "react";
import ClienteComponent from "@/app/dashboard/clientes/components/clienteComponent";
import { IoAdd } from "react-icons/io5";
import UpdateClienteModal from "@/app/dashboard/clientes/components/updateCliente";
import AddClienteModal from "@/app/dashboard/clientes/components/addCliente";
import { useClientes } from "@/hooks/useClients";

export default function ClientePage() {
  const {
    clientes,
    isEditModalOpen,
    selectedCliente,
    isAddModalOpen,
    openEditModal,
    closeEditModal,
    openAddModal,
    closeAddModal,
    handleUpdateCliente,
    handleDeleteCliente,
    handleAddCliente,
  } = useClientes();

  return (
    <div className="user-container">
      <button
        onClick={openAddModal}
        className="fixed bottom-10 right-10 bg-black shadow-lg rounded-full w-12 h-12 flex justify-center items-center"
      >
        <IoAdd size={40} color="white" />
      </button>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Clientes</h1>
      <ClienteComponent
        clientes={clientes}
        onEditCliente={openEditModal}
        onDeleteCliente={handleDeleteCliente}
      />
      <AddClienteModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onAddCliente={handleAddCliente}
      />
      {isEditModalOpen && selectedCliente && (
        <UpdateClienteModal
          cliente={selectedCliente}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onUpdateCliente={handleUpdateCliente}
        />
      )}
    </div>
  );
}
