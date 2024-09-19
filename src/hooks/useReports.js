import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export function useReports() {
  const [ventasHoy, setVentasHoy] = useState([]);
  const [ventas2años, setVentas2años] = useState([]);
  const [cantidadPorTipoProductoSemanal, setCantidadPorTipoProductoSemanal] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.token) {
      fetchVentasHoy();
      fetchVentas2años();
      fetchCantidadPorTipoProductoSemanal();
    }
  }, [session]);

  const fetchVentasHoy = async () => {
    try {
      const res = await fetch("http://localhost:3010/reportes/ventas-hoy", {
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
      const res = await fetch("http://localhost:3010/reportes/ventas-2-years", {
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
      const res = await fetch("http://localhost:3010/reportes/ventas-categoria-semanal", {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      });

      if (!res.ok) {
        console.error("Error fetching cantidad de producto por tipo", res.statusText);
        return;
      }

      const data = await res.json();
      setCantidadPorTipoProductoSemanal(data);
    } catch (error) {
      console.error("Error fetching cantidad de producto por tipo", error);
    }
  };
  return { ventasHoy, ventas2años, cantidadPorTipoProductoSemanal };
}
