"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { signIn, useSession } from "next-auth/react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!re.test(email)) {
      setEmailError("Por favor, introduce un correo electrónico válido.");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres.");
    } else {
      setPasswordError("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailError || passwordError) {
      return;
    }

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      await Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al iniciar sesión",
        timer: 1500,
      });
      return;
    }

    if (responseNextAuth.ok) {
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Autenticación exitosa",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  };

  return (
    
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Bienvenido
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ingresa tus credenciales para acceder
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-1">
            <div className="h-20">
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Dirección de correo"
                value={email}
                onChange={handleEmailChange}
              />
              <div className="h-5 mt-1">
                {emailError && <p className="text-sm text-red-600">{emailError}</p>}
              </div>
            </div>
            <div className="h-24">
  <div className="relative">
    <label htmlFor="password" className="sr-only">
      Contraseña
    </label>
    <input
      id="password"
      name="password"
      type={showPassword ? "text" : "password"}
      autoComplete="current-password"
      required
      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10"
      placeholder="Contraseña"
      value={password}
      onChange={handlePasswordChange}
    />
    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
      <button
        type="button"
        className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <IoMdEyeOff className="h-5 w-5" />
        ) : (
          <IoMdEye className="h-5 w-5" />
        )}
      </button>
    </div>
  </div>
  <div className="h-5 mt-1">
    {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
  </div>
</div>
          </div>

          {errors.length > 0 && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Se encontraron los siguientes errores:
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <ul className="list-disc pl-5 space-y-1">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
              disabled={emailError || passwordError}
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    
  );
};

export default LoginForm;