import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export function useReports() {
  const [ventasHoy, setVentasHoy] = useState([]);
  const [ventas2años, setVentas2años] = useState([]);
  const [cantidadPorTipoProductoSemanal, setCantidadPorTipoProductoSemanal] =
    useState([]);
  const [pedidos30Dias, setPedido30Dias] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.token) {
      fetchVentasHoy();
      fetchVentas2años();
      fetchCantidadPorTipoProductoSemanal();
      fetchPedido30Dias();
    }
  }, [session]);

  const fetchVentasHoy = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reportes/ventas-hoy`, {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      });

      if (!res.ok) {
        console.error("Error fetching ventas de hoy:", res.statusText);
        return;
      }

      const data = await res.json();
      setVentasHoy(data);
    } catch (error) {
      console.error("Error fetching ventas de hoy:", error);
    }
  };

  const fetchVentas2años = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reportes/ventas-2-years`, {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      });

      if (!res.ok) {
        console.error("Error fetching ventas de 2 años:", res.statusText);
        return;
      }

      const data = await res.json();
      setVentas2años(data);
    } catch (error) {
      console.error("Error fetching ventas de 2 años:", error);
    }
  };

  const fetchCantidadPorTipoProductoSemanal = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reportes/ventas-categoria-semanal`,
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );

      if (!res.ok) {
        console.error(
          "Error fetching cantidad de producto por tipo",
          res.statusText
        );
        return;
      }

      const data = await res.json();
      setCantidadPorTipoProductoSemanal(data);
    } catch (error) {
      console.error("Error fetching cantidad de producto por tipo", error);
    }
  };

  const fetchPedido30Dias = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reportes/ventas-30-dias`, {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      });

      if (!res.ok) {
        console.error("Error fetching pedidos de 30 días:", res.statusText);
        return;
      }

      const data = await res.json();
      setPedido30Dias(data);
    } catch (error) {
      console.error("Error fetching pedidos de 30 días:", error);
    }
  };

  const generarExcelStock = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reportes-doc/inventario`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.user.token}`,
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Inventario ${formattedDate}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error fetching the inventory report:", error);
    }
  };

  const generarExcelClientes = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reportes-doc/clientes`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.user.token}`,
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Clientes ${formattedDate}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error fetching the clients report:", error);
    }
  };

  const generarExcelPedidos = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reportes-doc/pedidos`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.user.token}`,
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Pedidos ${formattedDate}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error fetching the orders report:", error);
    }
  };

  return {
    ventasHoy,
    ventas2años,
    cantidadPorTipoProductoSemanal,
    pedidos30Dias,
    generarExcelStock,
    generarExcelClientes,
    generarExcelPedidos,
  };
}
