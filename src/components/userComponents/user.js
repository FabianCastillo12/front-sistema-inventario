// src/components/user.js

"use client";

import Link from "next/link";

const User = () => {
  return (
    <div className="user-container">
      <div className="add-user-button-container">
        <Link href="/dashboard/user/adduser">
          <button className="btn-add">Agregar Usuario</button>
        </Link>
      </div>
      <div className="user-card">
        <div className="user-name">Ejemplo de Usuario</div>
        <div className="user-actions">
          <button className="btn-delete">Eliminar</button>
          <Link href="/dashboard/user/updateuser">
            <button className="btn-update">Modificar</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default User;
