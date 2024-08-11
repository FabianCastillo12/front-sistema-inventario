import React from "react";
import Link from "next/link";

export default function UserComponent({ users, onEditUser, onDeleteUser }) {
  console.log(users)
  return (
    <>
      <table className="min-w-full bg-white border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row">
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Nombre</th>
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Email</th>
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Rol</th>
            <th className="bg-black p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Acciones</th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group text-black">
          {users&& users?.map(user => (
            <tr key={user.id} className="bg-white border border-grey-500 md:border-none block md:table-row">
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">{user.nombre}</td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">{user.email}</td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">{user.role}</td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <button
                  onClick={() => onEditUser(user)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded mr-1"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDeleteUser(user.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}