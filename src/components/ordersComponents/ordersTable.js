import React, { useState, useEffect } from "react";
// **COMENTADO POR AHORA - IMPLEMENTAR MÁS ADELANTE**
import OrderModal from "@/components/ordersComponents/editOrder";
import { useStore } from "@/stores/autenticacion";
import { useSession } from "next-auth/react";
import ViewOrderModal from "@/components/ordersComponents/viewOrder"; // **NUEVA IMPORTACIÓN**

const OrdersTable = ({ orders /* onDeleteOrder, onUpdateOrder */ }) => { // Parámetros comentados por ahora
  // **COMENTADO POR AHORA - IMPLEMENTAR MÁS ADELANTE**
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formDataEdit, setFormDataEdit] = useState(null);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false); // NUEVO ESTADO**
  const [formDataView, setFormDataView] = useState(null); // NUEVO ESTADO** 

  const [orderList, setOrderList] = useState(orders);
  const user = useStore((state) => state.user);
  const { data: session, status } = useSession();

  useEffect(() => {
    setOrderList(orders);
  }, [orders]);

  // **COMENTADO POR AHORA - IMPLEMENTAR MÁS ADELANTE**
  const editOrder = (open, order) => {
    setIsEditModalOpen(open);
    setFormDataEdit(order);
  };
  const viewOrder = (open, order) => { // NUEVA FUNCIÓN**
    setIsViewModalOpen(open);
    setFormDataView(order);
  };

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
              <td className="py-2 px-4 border-b">{order.fecha}</td>
              <td className="py-2 px-4 border-b">{order.cliente}</td>
              <td className="py-2 px-4 border-b">{order.total}</td>
              <td className="py-2 px-4 border-b">{order.estado}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => viewOrder(true, order)}
                  className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 mr-1"
                >
                  Ver
                </button>

                <button
                  onClick={() => editOrder(true, order)}
                  className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                >
                  Modificar
                </button>



                {session && session.user && session.user.rol === "admin" && (  /*Verifica si session es truthy (es decir, no es null, undefined o false).*/



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
        // onUpdateOrder={onUpdateOrder} // Comentado por ahora

        />
      )}
      {/* **NUEVO MODAL PARA VER PEDIDO** */}
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