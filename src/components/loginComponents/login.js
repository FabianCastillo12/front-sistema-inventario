"use client";
import { useStore } from "@/stores/autenticacion";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const LoginForm = () => {
  const { addUser } = useStore();
  const router = useRouter();
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  useEffect(() => {
    const item = localStorage.getItem("user-store");
    if (item) {
      const parsedItem = JSON.parse(item);

      if (parsedItem.state.user.token) {
        addUser(parsedItem);
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      email,
      password,
    };
    try {
      const res = await fetch("http://localhost:3010/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error en la solicitud:", errorData);
        throw new Error("Error en la solicitud");
      }

      const data = await res.json();

      if (data.token) {
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Autenticacion exitoso",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/dashboard");
        addUser(data);
        localStorage.setItem("strinitem", JSON.stringify(data));
      } else {
        alert("credenciales incorrecto");
      }
    } catch (error) {
      console.log(error);
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
