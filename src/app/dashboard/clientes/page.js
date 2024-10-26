"use client";
import React from "react";
import ClienteComponent from "@/app/dashboard/clientes/components/clienteComponent";
import { IoAdd } from "react-icons/io5";
import UpdateClienteModal from "@/app/dashboard/clientes/components/updateCliente";
import AddClienteModal from "@/app/dashboard/clientes/components/addCliente";
import { useClientes } from "@/hooks/useClients";
import { useReports } from "@/hooks/useReports";

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
  const { generarExcelClientes } = useReports();

  return (
    <div className="">
      <button
        onClick={openAddModal}
        className="fixed bottom-10 right-10 bg-black shadow-lg rounded-full w-12 h-12 flex justify-center items-center"
      >
        <IoAdd size={40} color="white" />
      </button>
      <h1 className="text-3xl font-semibold text-white mb-6">Clientes</h1>
      <ClienteComponent
        clientes={clientes}
        onEditCliente={openEditModal}
        onDeleteCliente={handleDeleteCliente}
      />
      <button
          onClick={generarExcelClientes}
          className="bg-[#006400] text-white text-xs px-2 py-2 rounded-md mt-4"
        >
          Exportar en Excel
        </button>
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
