"use client";
import UserComponent from "@/app/dashboard/user/components/userComponent";
import { IoPersonAddOutline } from "react-icons/io5";
import UpdateUserModal from "@/app/dashboard/user/components/updateUser";
import AddUserModal from "@/app/dashboard/user/components/addUser";
import { useUsers } from "@/hooks/useUsers";

export default function UserPage() {
  const {
    users,
    isEditModalOpen,
    selectedUser,
    isAddModalOpen,
    isMounted,
    setIsEditModalOpen,
    setSelectedUser,
    setIsAddModalOpen,
    handleUpdateUser,
    handleDeleteUser,
    handleAddUser,
  } = useUsers();

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