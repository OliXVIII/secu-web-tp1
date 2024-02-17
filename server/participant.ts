"use server";

const participants = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john-doe@gmail.com",
  },
] as Participant[];

export async function getParticipants() {
  console.log("getParticipants");
  return participants;
}

export async function addParticipant(participant: Participant) {
  if (participant.email) {
    const index = participants.findIndex((p) => p.email === participant.email);
    if (index !== -1) {
      return participants[index];
    }
  }
  console.log("addParticipant", participant);
  participants.push(participant);
}
