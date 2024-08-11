"use client";
import Link from "next/link";
import UserComponent from "@/components/userComponents/userComponent";
import { IoAdd } from "react-icons/io5";
import UpdateUserModal from "@/components/userComponents/updateUser";
import { useEffect, useState } from "react";
import { usePathname, redirect, useRouter } from "next/navigation";
import { useStore } from "@/stores/autenticacion";
import AddUserModal from "@/components/userComponents/addUser";

export default function UserPage() {
  const router = useRouter();
  const user = useStore((state)=>state.user);
  const [users, setUsers] = useState("");
  console.log(users)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    // const redireccion = () => {
    //   if (user.rol !== "admin") {
    //     router.push("/dashboard/home");
    //   }
    // };
    // redireccion();
    traerUsuarios()
  }, []);
  const traerUsuarios=async()=>{
    try {
      const res = await fetch("http://localhost:3010/auth/", {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
        
  
      });
      const data=await res.json()
      console.log(data)
      setUsers(data)
    } catch (error) {
       console.log(error)
    }
    
  }
    
  if (user.rol !== "admin") {
    return null;
  }

  const handleUpdateUser = (updatedUser) => {
    setUsers(
      users?.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const handleDeleteUser = (userId) => {
    const userToDelete = users.find((user) => user.id === userId);
    if (
      userToDelete &&
      window.confirm(`¿Se eliminará el usuario ${userToDelete.name}?`)
    ) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const handleAddUser =async (newUser) => {
    const res = await fetch("http://localhost:3010/auth/", {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json' // Si estás enviando datos en formato JSON
      },
      body: JSON.stringify(newUser) // Si estás enviando datos en el cuerpo de la solicitud
  });
  const data =await res.json()
  console.log(data)

    
    setIsAddModalOpen(false);
  };

  return (
    <>
      <div className="user-container">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="absolute bottom-10 right-10 bg-black shadow-lg rounded-full w-12 h-12 flex justify-center items-center"
        >
          <IoAdd size={40} color="white" />
        </button>
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Usuarios</h1>
        <UserComponent
          users={users}
          onEditUser={(user) => {
            setSelectedUser(user);
            setIsEditModalOpen(true);
          }}
          onDeleteUser={handleDeleteUser}
        />
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
