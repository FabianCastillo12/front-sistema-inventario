"use client";
import React, { useState } from "react";
import { IoMenu, IoNotifications, IoPerson, IoSearch } from "react-icons/io5";
import Navbar from "./navbar";

export default function NavbarTop() {
  const [abrirNavbar, setAbrirNavbar] = useState(false);
  const navbarStyle = {
    transform: abrirNavbar ? "translateX(0)" : "translateX(-100%)",
    transition: "transform 0.3s ease-in-out",
  };
  return (
    <>
      <div className="  grid items-center grid-cols-12    bg-[#171821]   ">
        <div
          className="col-span-2  cursor-pointer  lg:hidden"
          onClick={() => setAbrirNavbar(true)}
        >
          <IoMenu color="white" size={25} />
        </div>
        <div className="p-2   bg-[#21222D]   col-span-7 rounded-lg  md:rounded-md m-1 flex md:col-span-6 lg:col-span-8  gap-1 items-center ">
          <IoSearch size={18} color="white" />
          <input
            type="search"
            className=" border-none bg-transparent text-white placeholder:text-white outline-none focus:outline-none focus:ring-0 focus:border-none w-full"
            placeholder="Search here..."
          />
        </div>
        <div className="p-2 rounded-md m-1 col-span-3 flex  gap-6 items-center justify-end lg:col-span-4">
          <IoNotifications size={25} color="white" />
          <IoPerson size={25} color="white" />
        </div>
      </div>
      <div
        className="fixed top-0 left-0  bg-[#171821]  h-full "
        style={navbarStyle}
      >
        <Navbar setAbrirNavbar={setAbrirNavbar} abrirNavbar={abrirNavbar} />
      </div>
    </>
  );
}
