import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

export function useProducts() {
  const [categoria, setCategoria] = useState([]);
  const [products, setProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { data: session } = useSession();
  console.log(categoria, products);
  useEffect(() => {
    if (session?.user?.token) {
      fetchProducts();
      fetchCategoria();
    }
  }, [session]);
  const fetchCategoria = async () => {
    try {
      const res = await fetch("http://localhost:3010/categoria", {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      });
      const data = await res.json();
      setCategoria(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:3010/producto/", {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      });
      const data = await res.json();
      setProducts(data.sort((a, b) => a.id - b.id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const res = await fetch("http://localhost:3010/producto/crear", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      if (res.ok) {
        await fetchProducts();
        setIsAddModalOpen(false);
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Producto agregado",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("Error al agregar el producto");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleUpdateProduct = async (formData) => {
    try {
      const datos = {
        nombre: formData.nombre,
        precio: Number(formData.precio),
        categoria: formData.categoria,
      }
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: `Se actualizará el producto ${datos.nombre}.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, actualizar",
        cancelButtonText: "Cancelar",
      });
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `http://localhost:3010/producto/${formData.id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.user.token}`,
              },
              body: JSON.stringify(datos),
            }
          );
          const data = await res.json();
          console.log(data);
          if (res.ok) {
            await fetchProducts();
            console.log(res)
            await Swal.fire({
              position: "center",
              icon: "success",
              title: "Producto actualizado",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } catch (error) {
          console.error("Error en la solicitud:", error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    const productToDelete = products.find(
      (product) => product.id === productId
    );
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `Se eliminará el producto ${productToDelete.name}. Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3010/producto/${productId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        });
        if (res.ok) {
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
          );
          await Swal.fire({
            position: "center",
            icon: "success",
            title: "Producto eliminado",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          console.error("Error al eliminar el producto");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  };

  return {
    products,
    isAddModalOpen,
    editingProduct,
    setIsAddModalOpen,
    setEditingProduct,
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    categoria,
  };
}
