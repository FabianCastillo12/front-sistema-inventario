"use client";

import { redirect, usePathname } from "next/navigation";

import { useEffect } from "react";
import { HashLoader } from "react-spinners";
import { signIn, useSession,signOut } from "next-auth/react";
export default function createPost() {
  const {data:sesión}=useSession()
  console.log(sesión)
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  const direcion = () => {
    redirect("/dashboard/home");
  };
  useEffect(() => {
    direcion();
  }, []);
  return (
    <>
      <div className=" justify-center flex  items-center  flex-1 h-screen">
        <HashLoader
          color={"white"}
          loading={true}
          cssOverride={override}
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
}
