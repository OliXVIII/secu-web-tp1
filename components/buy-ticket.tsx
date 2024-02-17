"use client";

import { saveUserRegistration } from "@/server/get-events";
import { EventType } from "@/types/event";
import { useRef, useState } from "react";
import Cookie from "js-cookie";

type BuyTicketProps = {
  event: EventType;
  zone: string;
};

export const BuyTicket = ({ event, zone }: BuyTicketProps) => {
  const [message, setMessage] = useState<string>("");
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [hideBuyButton, setHideBuyButton] = useState<boolean>(false);
  const buyTicket = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      const dialog: HTMLDialogElement | null = document.getElementById(
        "dialog"
      ) as HTMLDialogElement | null;
      if (!dialog) {
        return;
      }
      if (dialog) {
        dialog.showModal();
      }
      document.addEventListener("click", (e) => {
        if (e.target === dialog) {
          dialog.close();
        }
      });
      return;
    } else {
      const events = JSON.parse(localStorage.getItem("events  ") ?? "[]") ?? [];
      events.push(event);
      localStorage.setItem("events", JSON.stringify(events));
      const response: string = await saveUserRegistration(
        event,
        JSON.parse(user),
        zone
      );
      setMessage(response);

      if (
        response === "Billet réservé!" ||
        response === "Billet déjà réservé!"
      ) {
        setHideBuyButton(true);
        Cookie.set(event.eventName.replaceAll(" ", "-"), "true");
        return;
      }
      dialogRef.current?.showModal();
      //close after 1.5s
      setTimeout(() => {
        dialogRef.current?.close();
      }, 1500);
    }

    // remove when clicking outside the dialog
  };
  if (hideBuyButton) {
    return (
      <p className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
        Billet déjà réservé
      </p>
    );
  }
  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => buyTicket()}
      >
        Réservé un billet
      </button>
      <dialog
        ref={dialogRef}
        open={false}
        className="fixed inset-0 z-10 rounded-md"
      >
        <div className="flex flex-col p-5 w-60 bg-white rounded-md shadow-md">
          <p>{message}</p>
        </div>
      </dialog>
    </>
  );
};
