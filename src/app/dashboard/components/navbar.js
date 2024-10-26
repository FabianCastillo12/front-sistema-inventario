"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  IoBag,
  IoHome,
  IoFileTrayStackedSharp,
  IoPeople,
  IoPersonCircle,
  IoChevronBackOutline,
  IoLogIn,
  IoReceipt,
} from "react-icons/io5";
import "../../../styles/navbar.css";
import { useStore } from "@/stores/autenticacion";
import { signIn, useSession, signOut } from "next-auth/react";

const Navbar = ({ setAbrirNavbar, abrirNavbar }) => {
  const { data: session, status } = useSession();
  const user = useStore((state) => state.user);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className="navbar-container">
      <ul>
        <li>
          <Link href="/dashboard/home">
            {isClient && <IoHome size={25} />}
            <span>Home</span>
          </Link>
        </li>

        {isClient && session?.user.rol === "admin" && (
          <li>
            <Link href="/dashboard/user">
              <IoPersonCircle size={29} />
              <span>Usuarios</span>
            </Link>
          </li>
        )}

        <li>
          <Link href="/dashboard/products">
            {isClient && <IoBag size={25} />}
            <span>Productos</span>
          </Link>
        </li>
        
        <li>
          <Link href="/dashboard/stock">
            {isClient && <IoFileTrayStackedSharp size={25} />}
            <span>Stock</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/clientes">
            {isClient && <IoPeople size={25} />} <span>Clientes</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/orders">
            {isClient && <IoReceipt size={25} />}
            <span>Pedidos</span>
          </Link>
        </li>
        
        
      </ul>
      {abrirNavbar && (
        <div
          onClick={() => setAbrirNavbar(false)}
          className="block bg-white p-2 rounded-full absolute bottom-10 -right-4 shadow-md lg:hidden"
        >
          <IoChevronBackOutline size={20} />
        </div>
        
      )}
    </nav>
  );
};

export default Navbar;