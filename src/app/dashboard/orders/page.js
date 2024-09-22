"use client";
import React, { useState } from "react";
import OrdersTable from "@/app/dashboard/orders/components/ordersTable";
import { IoAdd } from "react-icons/io5";
import OrderAddModal from "@/app/dashboard/orders/components/addOrder";
import { usePedidos } from "@/hooks/usePedidos";

export default function OrdersPage() {
  const { pedidos, handleAddOrder, handleDeleteOrder, handleConfirmOrder } =
    usePedidos();
  const [activeTab, setActiveTab] = useState("pendientes");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const pedidosRegistrados = pedidos.filter(
    (pedido) => pedido.estado === "Registrado"
  );
  const pedidosEntregados = pedidos.filter(
    (pedido) => pedido.estado === "Entregado"
  );

  return (
    <>
      <div className="stock-container p-6 bg-white shadow-lg rounded-md shadow-md">
        <button
          onClick={() => {
            setIsAddModalOpen(true);
          }}
          className="fixed bottom-10 right-10 bg-black rounded-full w-12 h-12 flex justify-center items-center"
        >
          <IoAdd size={40} color="white" />
        </button>

        {/* Content based on active tab */}
        <div
          className={`transition-opacity duration-500 ease-in-out transform ${
            activeTab === "pendientes"
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-5"
          }`}
          style={{ display: activeTab === "pendientes" ? "block" : "none" }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">
              Pedidos Pendientes
            </h1>
            <div className="tabs mb-6">
              <button
                className={`px-4 py-2 font-semibold ${
                  activeTab === "pendientes"
                    ? "bg-[#05023c] text-white"
                    : "bg-gray-200 text-gray-800"
                } rounded-l-lg`}
                onClick={() => setActiveTab("pendientes")}
              >
                Pedidos Registrados
              </button>
              <button
                className={`px-4 py-2 font-semibold ${
                  activeTab === "entregados"
                    ? "bg-[#05023c] text-white"
                    : "bg-gray-200 text-gray-800"
                } rounded-r-lg`}
                onClick={() => setActiveTab("entregados")}
              >
                Pedidos Entregados
              </button>
            </div>
          </div>

          <OrdersTable
            orders={pedidosRegistrados}
            onConfirmOrder={handleConfirmOrder}
            onDeleteOrder={handleDeleteOrder}
            isRegistrados={true}
          />
        </div>

        <div
          className={`transition-opacity duration-500 ease-in-out transform ${
            activeTab === "entregados"
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-5"
          }`}
          style={{ display: activeTab === "entregados" ? "block" : "none" }}
        >
          <div className="mb-6 flex justify-between">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
              Pedidos Entregados
            </h1>
            <div className="tabs mb-6">
              <button
                className={`px-4 py-2 font-semibold ${
                  activeTab === "pendientes"
                    ? "bg-[#05023c] text-white"
                    : "bg-gray-200 text-gray-800"
                } rounded-l-lg`}
                onClick={() => setActiveTab("pendientes")}
              >
                Pedidos Registrados
              </button>
              <button
                className={`px-4 py-2 font-semibold ${
                  activeTab === "entregados"
                    ? "bg-[#05023c] text-white"
                    : "bg-gray-200 text-gray-800"
                } rounded-r-lg`}
                onClick={() => setActiveTab("entregados")}
              >
                Pedidos Entregados
              </button>
            </div>
          </div>
          <OrdersTable
            orders={pedidosEntregados}
            onConfirmOrder={handleConfirmOrder}
            onDeleteOrder={handleDeleteOrder}
            isRegistrados={false}
          />
        </div>

        <OrderAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddOrder={handleAddOrder}
        />
      </div>
    </>
  );
}
