import React from "react";
import { IoNotifications, IoPerson, IoSearch } from "react-icons/io5";

export default function NavbarTop() {
  return (
    <div className="  grid items-center grid-cols-12 ">
      <div className="p-2  bg-[#21222D]   col-span-8 rounded-md m-1 flex  gap-1 items-center">
        <IoSearch size={18} color="white" />
        <input
          type="search"
          className=" border-none bg-transparent text-white placeholder:text-white outline-none focus:outline-none focus:ring-0 focus:border-none w-full"
          placeholder="Search here..."
        />
      </div>
      <div className="p-2 rounded-md m-1 col-span-4 flex  gap-6 items-center justify-end ">
        <IoNotifications size={25} color="white" />
        <IoPerson size={25} color="white" />
      </div>
    </div>
  );
}
