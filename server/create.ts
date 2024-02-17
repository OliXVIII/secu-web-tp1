"use server";

import { redirect } from "next/navigation";
import { addParticipant } from "./participant";

export async function create(participant: Participant) {
  console.log("create");
  if (!participant) {
    return;
  }
  addParticipant(participant);
  redirect("/events");
}
