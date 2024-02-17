"use client";
import { useEffect, useState } from "react";

export const LoginButton = () => {
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    const userName = localStorage.getItem("user");
    setUser(userName);
  }, [user]);

  if (user) {
    return (
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          localStorage.removeItem("user");
          window.location.reload();
        }}
      >
        Deconnexion
      </button>
    );
  } else {
    return (
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          const dialog: HTMLDialogElement | null = document.getElementById(
            "dialog"
          ) as HTMLDialogElement | null;
          if (!dialog) {
            return;
          }
          if (dialog) {
            dialog.showModal();
          }
        }}
      >
        Connecter
      </button>
    );
  }
};
