// components/navbar.js
"use client";
import {
  IoBag,
  IoHome,
  IoFileTrayStackedSharp,
  IoPeopleSharp,
} from "react-icons/io5";
import Link from "next/link";
import "../../styles/navbar.css";
import { useStore } from "@/stores/autenticacion";
const Navbar = () => {
  const user = useStore((state) => state.user);

  return (
    <nav className="navbar-container">
      <ul>
        <li>
          <Link href="/dashboard/home" legacyBehavior>
            <a>
              <IoHome size={25} />
              <i className="ai-home"></i>
              <span>Home</span>
            </a>
          </Link>
        </li>

        {user.rol === "admin" && (
          <li>
            <Link href="/dashboard/user" legacyBehavior>
              <a>
                <IoPeopleSharp size={25} />
                <i className="ai-person"></i>
                <span>Usuarios</span>
              </a>
            </Link>
          </li>
        )}

        <li>
          <Link href="/dashboard/products" legacyBehavior>
            <a>
              <IoBag size={25} />
              <i className="ai-home"></i>
              <span>Productos</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/stock" legacyBehavior>
            <a>
              <IoFileTrayStackedSharp size={25} />
              <i className="ai-home"></i>
              <span>Stock</span>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
