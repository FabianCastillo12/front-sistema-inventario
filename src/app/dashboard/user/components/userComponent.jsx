import React from "react";

export default function UserComponent({ users, onEditUser, onDeleteUser }) {
  return (
    <div className="bg-[#2A2C39] rounded-lg shadow-md overflow-hidden" >
      <table className="min-w-full divide-y divide-[#3D4059]">
        <thead>
          <tr className="bg-[#3D4059]">
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Rol
            </th>
            <th scope="col" className="px-4 py-3 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider w-52">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#3D4059]">
          {users?.map((user) => (
            <tr key={user.id} className="hover:bg-[#343747] transition-colors duration-150 ease-in-out">
              <td className="px-6 py-2 whitespace-nowrap">
                <div className="text-sm font-medium text-white">{user.nombre}</div>
              </td>
              <td className="px-6 py-2 whitespace-nowrap">
                <div className="text-sm text-gray-300">{user.email}</div>
              </td>
              <td className="px-6 py-2 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                  {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                </span>
              </td>
              <td className="py-2 whitespace-nowrap text-right">
                <div className="flex justify-end items-center pr-4">
                  <button
                    onClick={() => onEditUser(user)}
                    className="text-[#4B84F0] hover:text-[#3D72D9] bg-[#2A2C39] hover:bg-[#343747] px-2 py-1 rounded-md transition-colors duration-150 ease-in-out text-sm mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDeleteUser(user.id)}
                    className="text-red-400 hover:text-red-500 bg-[#2A2C39] hover:bg-[#343747] px-2 py-1 rounded-md transition-colors duration-150 ease-in-out text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}