"use client";
import UserComponent from "@/components/userComponents/userComponent";
import { IoPersonAddOutline } from "react-icons/io5";
import UpdateUserModal from "@/components/userComponents/updateUser";
import { useEffect, useState } from "react";
import { useStore } from "@/stores/autenticacion";
import AddUserModal from "@/components/userComponents/addUser";
import Swal from "sweetalert2";

export default function UserPage() {
  const user = useStore((state) => state.user);
  const [users, setUsers] = useState([]);
  console.log(users);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    traerUsuarios();
  }, []);

  const traerUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:3010/auth/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      const sortedData = data.sort((a, b) => a.id - b.id);
      setUsers(sortedData);
    } catch (error) {
      console.log(error);
    }
  };
  if (user.rol !== "admin") {
    return null;
  }

  const handleUpdateUser = async (updatedUser) => {
    const { id, ...userData } = updatedUser;
    try {
      const res = await fetch(`http://localhost:3010/auth/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        await traerUsuarios();

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
        console.error("Error al actualizar el usuario:", errorData.message);
        await Swal.fire({
          position: "center",
          icon: "error",
          title: "Error al actualizar el usuario",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
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
            Authorization: `Bearer ${user.token}`,
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
          console.error("Error al eliminar el usuario:", errorData.message);
          await Swal.fire({
            position: "center",
            icon: "error",
            title: "Error al eliminar el usuario",
            text: errorData.message,
            showConfirmButton: true,
          });
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  };

  const handleAddUser = async (newUser) => {
    const res = await fetch("http://localhost:3010/auth/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
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
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="user-container">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="fixed bottom-10 right-10 bg-black shadow-lg rounded-full w-16 h-16 flex justify-center items-center"
        >
          <IoPersonAddOutline size={30} color="white" />
        </button>
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Usuarios</h1>
        {users.length > 0 && (
          <UserComponent
            users={users}
            onEditUser={(user) => {
              setSelectedUser(user);
              setIsEditModalOpen(true);
            }}
            onDeleteUser={handleDeleteUser}
          />
        )}
        <AddUserModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddUser={handleAddUser}
        />
        {isEditModalOpen && selectedUser && (
          <UpdateUserModal
            user={selectedUser}
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onUpdateUser={handleUpdateUser}
          />
        )}
      </div>
    </>
  );
}
