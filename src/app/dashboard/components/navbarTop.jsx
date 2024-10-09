"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoMenu, IoNotifications, IoPerson, IoLogIn } from "react-icons/io5"; // IoSettings no se utiliza
import Navbar from "./navbar";
import { useSession, signOut } from "next-auth/react"; // Importar NextAuth

export default function NavbarTop() {
  const [abrirNavbar, setAbrirNavbar] = useState(false);
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const menuRef = useRef(null);

  const { data: session, status } = useSession(); // Obtener la sesión actual
 console.log(session)
  // Asegúrate de que los hooks no cambien de render a render
  useEffect(() => {
    // Manejar clics fuera del menú
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMostrarMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Evita que el componente retorne condicionalmente diferente cantidad de hooks
  if (status === "loading") {
    return <p>Cargando...</p>;
  }
 const nombre=(nombreCompleto)=>{
  const partes = nombreCompleto.split(" ");
    const nombre = partes[0].charAt(0).toUpperCase() + partes[0].slice(1); // Capitaliza el nombre
    const inicialApellido = partes[1].charAt(0).toUpperCase(); // Inicial de "tokio"

    return `${nombre} ${inicialApellido}`; // Combina el nombre y la inicial
 }
  const navbarStyle = {
    transform: abrirNavbar ? "translateX(0)" : "translateX(-100%)",
    transition: "transform 0.3s ease-in-out",
  };

  return (
    <>
      <div className="grid items-center grid-cols-12 bg-[#171821]">
        <div
          className="col-span-2 cursor-pointer lg:hidden"
          onClick={() => setAbrirNavbar(true)}
        >
          <IoMenu color="white" size={25} />
        </div>

        <div className="p-2 bg-[#171821] col-span-7 rounded-lg md:rounded-md m-1 flex md:col-span-6 lg:col-span-8 gap-1 items-center"></div>

        <div className="p-2 rounded-md m-1 col-span-3 flex gap-6 items-center justify-end lg:col-span-4 pr-8 relative">
          
         
          <div className="relative flex items-center gap-3">
          <p className="text-white font-bold text-lg">{nombre(session?.user?.user) }.</p>
            <IoPerson
              size={25}
              color="white"
              className="cursor-pointer"
              onClick={() => setMostrarMenu(!mostrarMenu)}
            />
              

            {mostrarMenu && (
              <div
                ref={menuRef}
                className="absolute top-7 right-0 mt-2 w-48 bg-[#21222D] rounded-md shadow-lg py-2 z-10 animate-slide-down"
              >
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700"
                  onClick={() => signOut()}
                >
                  <IoLogIn size={20} className="mr-2" />
                  Cerrar sesión
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className="fixed top-0 left-0 bg-[#171821] h-full"
        style={navbarStyle}
      >
        <Navbar setAbrirNavbar={setAbrirNavbar} abrirNavbar={abrirNavbar} />
      </div>

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
