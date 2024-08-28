import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

export function useUsers() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (session) {
      setIsMounted(true);
      fetchUsers();
    }
  }, [session]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3010/auth/", {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      });
      const data = await res.json();
      setUsers(data.sort((a, b) => a.id - b.id));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      const { id, ...userData } = updatedUser;
      const res = await fetch(`http://localhost:3010/auth/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session.user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        await fetchUsers();
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Usuario actualizado",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsEditModalOpen(false);
      } else {
        const errorData = await res.json();
        await Swal.fire({
          position: "center",
          icon: "error",
          title: "Error al actualizar el usuario",
          text: errorData.message,
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    const userToDelete = users.find((user) => user.id === userId);

    if (!userToDelete) return;

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `Se eliminará el usuario ${userToDelete.name}. Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3010/auth/${userId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        });

        if (res.ok) {
          setUsers(users.filter((user) => user.id !== userId));
          await Swal.fire({
            position: "center",
            icon: "success",
            title: "Usuario eliminado",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          const errorData = await res.json();
          await Swal.fire({
            position: "center",
            icon: "error",
            title: "Error al eliminar el usuario",
            text: errorData.message,
            showConfirmButton: true,
          });
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleAddUser = async (newUser) => {
    try {
      const res = await fetch("http://localhost:3010/auth/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();

      if (data) {
        setUsers((prevUsers) => [...prevUsers, data]);
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Usuario agregado",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsAddModalOpen(false);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return {
    users,
    isEditModalOpen,
    selectedUser,
    isAddModalOpen,
    isMounted,
    setIsEditModalOpen,
    setSelectedUser,
    setIsAddModalOpen,
    fetchUsers,
    handleUpdateUser,
    handleDeleteUser,
    handleAddUser,
  };
}
