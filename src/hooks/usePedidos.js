import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

export function usePedidos() {
  const [pedidos, setPedidos] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.token) {
      fetchPedidos();
    }
  }, [session]);

  const fetchPedidos = async () => {
    try {
      const res = await fetch("http://localhost:3010/pedidos/", {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      });

      if (!res.ok) {
        console.error("Error fetching clientes:", res.statusText);
        return;
      }

      const data = await res.json();
      setPedidos(data.sort((a, b) => a.id - b.id));
    } catch (error) {
      console.error("Error fetching pedidos:", error);
    }
  };









  return {
    pedidos
  }
}
