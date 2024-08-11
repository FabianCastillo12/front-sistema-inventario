"use client";

import { redirect, usePathname } from "next/navigation";

import { useEffect } from "react";

export default  function createPost() {


  useEffect(() => {
   
    const direcion = () => {
      redirect("/dashboard/home");
    };
    direcion();
  }, []);
  return <h1>loading...</h1>;
  // Update cached posts
  // Navigate to the new post page
}
