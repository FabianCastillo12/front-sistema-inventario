import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

export function useStock() {
  const [stock, setStock] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.token) {
      fetchStock();
    }
  }, [session]);

  const fetchStock = async () => {
    try {
      const res = await fetch("http://localhost:3010/producto/", {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      });

      if (!res.ok) {
        console.error("Error fetching stock:", res.statusText);
        return;
      }

      const data = await res.json();
      setStock(data.sort((a, b) => a.id - b.id));
    } catch (error) {
      console.error("Error fetching stock:", error);
    }
  };

  const handleUpdateStock = async (productId, newStock) => {
    try {
      const res = await fetch(`http://localhost:3010/producto/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.token}`,
        },
        body: JSON.stringify({ cantidadStock: newStock }),
      });

      if (res.ok) {
        setStock(prevStock =>
          prevStock.map(product =>
            product.id === productId
              ? { ...product, cantidadStock: newStock }
              : product
          )
        );
      } else {
        const data = await res.json();
        console.error("Error updating stock:", data.message);
        await Swal.fire({
          position: "center",
          icon: "error",
          title: `Error: ${data.message}`,
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const openUpdateModal = (product) => {
    setCurrentProduct(product);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setCurrentProduct(null);
  };

  return {
    stock,
    isUpdateModalOpen,
    currentProduct,
    openUpdateModal,
    closeUpdateModal,
    handleUpdateStock,
  };
}