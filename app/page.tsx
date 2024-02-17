import { EventsList } from "@/components/event-list";
import { MyEvents } from "@/components/my-events";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 max-sm:px-2">
      <div className="flex flex-col items-center justify-between" id="form">
        <MyEvents />
        <EventsList />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <a href="/about">À Propos</a>
        </button>
        <br />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <a href="/events/create">Créer un événement</a>
        </button>
      </div>
    </main>
  );
}
