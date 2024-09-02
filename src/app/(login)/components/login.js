"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { signIn, useSession, signOut } from "next-auth/react";
const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [password, setPassword] = useState("");
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log("olitass", responseNextAuth);

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }
    console.log("session", session);

    if (responseNextAuth.ok) {
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Autenticacion exitoso",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="w-1/3 h-full flex p-5 items-center justify-center bg-white rounded-2xl">
      <div className="bg-white w-full h-full p-10 rounded-lg">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-4">
          Bienvenido
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 w-full flex-col py-2"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              placeholder="Email address"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-1.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
