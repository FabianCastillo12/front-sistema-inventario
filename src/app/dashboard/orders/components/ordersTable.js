import React, { useState, useEffect } from "react";
import OrderModal from "@/app/dashboard/orders/components/editOrder";
import { useStore } from "@/stores/autenticacion";
import { useSession } from "next-auth/react";
import ViewOrderModal from "@/app/dashboard/orders/components/viewOrder";
import { useFormats } from "@/hooks/useFormats";

const OrdersTable = ({
  orders,
  onDeleteOrder,
  onConfirmOrder,
  isRegistrados,
}) => {
  console.log(orders);
  const { formatearFechaISO, currencyFormatter } = useFormats();

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [formDataView, setFormDataView] = useState(null);

  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const sortedOrders = [...orders].sort(
      (a, b) => new Date(b.fecha_pedido) - new Date(a.fecha_pedido)
    );
    setOrderList(sortedOrders);
  }, [orders]);

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
            <th className="py-2 px-4 border-b text-white w-1/12">ID</th>
            <th className="py-2 px-4 border-b text-white w-2/12">Fecha</th>
            <th className="py-2 px-4 border-b text-white w-2/12">Cliente</th>
            <th className="py-2 px-4 border-b text-white w-1/12">Total</th>
            <th className="py-2 px-4 border-b text-white w-1/12">Estado</th>
            {isRegistrados && (
              <>
                <th className="py-2 px-4 border-b text-white w-1/12">
                  Confirmar Entrega
                </th>
                <th className="py-2 px-4 border-b text-white w-1/12">
                  Cancelar Pedido
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody className="text-black text-center">
          {orderList.map((order) => (
            <tr
              key={order.id}
              onClick={() => viewOrder(true, order)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <td className="py-2 px-4 border-b">{order.id}</td>
              <td className="py-2 px-4 border-b">
                {formatearFechaISO(order.fecha_pedido)}
              </td>
              <td className="py-2 px-4 border-b">{order.cliente.nombre}</td>
              <td className="py-2 px-4 border-b">
                {currencyFormatter.format(order.total)}
              </td>
              <td className="py-2 px-4 border-b">{order.estado}</td>
              {isRegistrados && (
                <>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onConfirmOrder(order.id);
                      }}
                      className="bg-green-600 ml-1 text-white py-1 px-3 rounded hover:bg-green-700"
                      onMouseEnter={(e) =>
                        e.currentTarget.parentElement.parentElement.classList.remove(
                          "hover:bg-gray-100"
                        )
                      }
                      onMouseLeave={(e) =>
                        e.currentTarget.parentElement.parentElement.classList.add(
                          "hover:bg-gray-100"
                        )
                      }
                    >
                      Confirmar
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteOrder(order.id);
                      }}
                      className="bg-red-600 ml-1 text-white py-1 px-3 rounded hover:bg-red-700"
                      onMouseEnter={(e) =>
                        e.currentTarget.parentElement.parentElement.classList.remove(
                          "hover:bg-gray-100"
                        )
                      }
                      onMouseLeave={(e) =>
                        e.currentTarget.parentElement.parentElement.classList.add(
                          "hover:bg-gray-100"
                        )
                      }
                    >
                      Eliminar
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
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
