import { EventsList } from '@/components/event-list';
import { MyEvents } from '@/components/my-events';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20 max-lg:px-10 max-sm:px-2 max-w-full w-full">
      <div className="flex flex-col items-center justify-between w-screen overflow-x-hidden" id="form">
        <MyEvents />
        <EventsList />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <a href="/about">À Propos</a>
        </button>
        <br />
      </div>
    </main>
  );
}
