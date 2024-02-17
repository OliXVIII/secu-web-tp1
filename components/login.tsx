"use client";

import { useEffect, useRef } from "react";

export const Login = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const login = () => {
    const email = document.querySelector('input[type="email"]');
    const password = document.querySelector('input[type="password"]');
    if (
      email &&
      password &&
      email instanceof HTMLInputElement &&
      password instanceof HTMLInputElement
    ) {
      console.log("login", email.value, password.value);
      const user = { email: email.value, password: password.value };
      localStorage.setItem("user", JSON.stringify(user));
      window.location.reload();
    }
  };

  return (
    <dialog ref={dialogRef} id="dialog" open={false}>
      <div className="flex flex-col p-5 w-60 bg-white rounded-md shadow-md">
        <p>Email</p>
        <input type="email" className="border border-gray-200 p-1 rounded-md" />
        <p>Password</p>
        <input
          type="password"
          className="border border-gray-200 p-1 rounded-md"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 w-40 mx-auto"
          onClick={() => login()}
        >
          Connecter
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-5 w-40 mx-auto"
          onClick={() => dialogRef.current?.close()}
        >
          Annuler
        </button>
      </div>
    </dialog>
  );
};
