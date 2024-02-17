"use client";

import { create } from "../server/create";

export const Create = () => {
  return (
    <div>
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
          Add participant
        </h3>
        <p className="text-sm text-muted-foreground">
          Enter the participant's information to add them to the event.
        </p>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              First name
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="first-name"
              placeholder="Enter first name"
            ></input>
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              about="last-name"
            >
              Last name
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="last-name"
              placeholder="Enter last name"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            about="email"
          >
            Email
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="email"
            placeholder="Enter email"
            type="email"
          />
        </div>
      </div>

      <div className="flex justify-end p-6 space-x-4">
        <a
          className="flex items-center justify-center h-10 px-4 rounded-md bg-primary-foreground text-primary-background border shadow-s"
          href="/events"
        >
          Cancel
        </a>
        <button
          className="flex items-center justify-center h-10 px-4 rounded-md bg-primary-background text-primary-foreground border shadow-sm"
          onClick={() =>
            create({
              email: (document.getElementById("email") as HTMLInputElement)
                .value,
              firstName: (
                document.getElementById("first-name") as HTMLInputElement
              ).value,
              lastName: (
                document.getElementById("last-name") as HTMLInputElement
              ).value,
            })
          }
        >
          Add participant
        </button>
      </div>
    </div>
  );
};
