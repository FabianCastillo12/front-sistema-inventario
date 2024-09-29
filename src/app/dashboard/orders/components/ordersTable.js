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
    return <div className="text-white">No hay pedidos disponibles</div>;
  }

  return (
    <div className="bg-[#2A2C39] rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-[#3D4059]">
        <thead className="bg-[#3D4059]">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider w-1/12">ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider w-2/12">Fecha</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider w-2/12">Cliente</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider w-1/12">Total</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider w-1/12">Estado</th>
            {isRegistrados && (
              <>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider w-1/12">
                  Confirmar Entrega
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider w-1/12">
                  Cancelar Pedido
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#3D4059]">
          {orderList.map((order) => (
            <tr
              key={order.id}
              onClick={() => viewOrder(true, order)}
              className="cursor-pointer hover:bg-[#343747] transition-colors duration-150 ease-in-out"
            >
              <td className="px-6 py-2 whitespace-nowrap">
                <div className="text-sm font-medium text-white">{order.id}</div>
              </td>
              <td className="px-6 py-2 whitespace-nowrap">
                <div className="text-sm text-gray-300">{formatearFechaISO(order.fecha_pedido)}</div>
              </td>
              <td className="px-6 py-2 whitespace-nowrap">
                <div className="text-sm text-gray-300">{order.cliente.nombre}</div>
              </td>
              <td className="px-6 py-2 whitespace-nowrap">
                <div className="text-sm text-gray-300">{currencyFormatter.format(order.total)}</div>
              </td>
              <td className="px-6 py-2 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {order.estado}
                </span>
              </td>
              {isRegistrados && (
                <>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onConfirmOrder(order.id);
                      }}
                      className="text-green-400 hover:text-green-500 bg-[#2A2C39] hover:bg-[#343747] px-2 py-1 rounded-md transition-colors duration-150 ease-in-out text-sm"
                      onMouseEnter={(e) =>
                        e.currentTarget.closest('tr').classList.remove("hover:bg-[#343747]")
                      }
                      onMouseLeave={(e) =>
                        e.currentTarget.closest('tr').classList.add("hover:bg-[#343747]")
                      }
                    >
                      Confirmar
                    </button>
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteOrder(order.id);
                      }}
                      className="text-red-400 hover:text-red-500 bg-[#2A2C39] hover:bg-[#343747] px-2 py-1 rounded-md transition-colors duration-150 ease-in-out text-sm"
                      onMouseEnter={(e) =>
                        e.currentTarget.closest('tr').classList.remove("hover:bg-[#343747]")
                      }
                      onMouseLeave={(e) =>
                        e.currentTarget.closest('tr').classList.add("hover:bg-[#343747]")
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