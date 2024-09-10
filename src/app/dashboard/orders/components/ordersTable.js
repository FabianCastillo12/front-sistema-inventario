import React, { useState, useEffect } from "react";
import OrderModal from "@/app/dashboard/orders/components/editOrder";
import { useStore } from "@/stores/autenticacion";
import { useSession } from "next-auth/react";
import ViewOrderModal from "@/app/dashboard/orders/components/viewOrder";
import { useFormats } from "@/hooks/useFormats";

const OrdersTable = ({ orders, onDeleteOrder, onUpdateOrder }) => {
  console.log(orders);
  const { formatearFechaISO, currencyFormatter } = useFormats();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formDataEdit, setFormDataEdit] = useState(null);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [formDataView, setFormDataView] = useState(null);

  const [orderList, setOrderList] = useState(orders);
  const user = useStore((state) => state.user);
  const { data: session, status } = useSession();

  useEffect(() => {
    setOrderList(orders);
  }, [orders]);

  const editOrder = (open, order) => {
    setIsEditModalOpen(open);
    setFormDataEdit(order);
  };
  const viewOrder = (open, order) => {
    setIsViewModalOpen(open);
    setFormDataView(order);
  };

  if (!Array.isArray(orders)) {
    return <div>No hay pedidos disponibles</div>;
  }

  return (
    <div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-[#05023c]">
          <tr>
            <th className="py-2 px-4 border-b text-white">ID</th>
            <th className="py-2 px-4 border-b text-white">Fecha</th>
            <th className="py-2 px-4 border-b text-white">Cliente</th>
            <th className="py-2 px-4 border-b text-white">Total</th>
            <th className="py-2 px-4 border-b text-white">Estado</th>
            <th className="py-2 px-4 border-b text-white">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-black text-center">
          {orderList.map((order) => (
            <tr key={order.id}>
              <td className="py-2 px-4 border-b">{order.id}</td>
              <td className="py-2 px-4 border-b">{formatearFechaISO(order.fecha_pedido)}</td>
              <td className="py-2 px-4 border-b">{order.cliente.nombre}</td>
              <td className="py-2 px-4 border-b">{currencyFormatter.format(order.total)}</td>
              <td className="py-2 px-4 border-b">{order.estado}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => viewOrder(true, order)}
                  className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 mr-1"
                >
                  Ver
                </button>
                {/* 
                <button
                  onClick={() => editOrder(true, order)}
                  className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                >
                  Modificar
                </button>
                  */}
                {session &&
                  session.user &&
                  session.user.rol ===
                    "admin" && (
                    <button
                      onClick={() => onDeleteOrder(order.id)}
                      className="bg-red-600 ml-1 text-white py-1 px-3 rounded hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditModalOpen && (
        <OrderModal
          setIsEditModalOpen={setIsEditModalOpen}
          formDataEdit={formDataEdit}
          onUpdateOrder={onUpdateOrder}
          onClose={() => setIsEditModalOpen(false)}   
        />
      )}
      {isViewModalOpen && (
        <ViewOrderModal
          setIsViewModalOpen={setIsViewModalOpen}
          formDataView={formDataView}
        />
      )}
    </div>
  );
};

export default OrdersTable;
