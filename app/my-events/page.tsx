import { EventsList } from '@/components/event-list';
import { MyEventsClient } from '@/components/my-events-client';

const MyEventsPage = () => {
  return (
    <MyEventsClient>
      <EventsList isMyEvent={true} />
    </MyEventsClient>
  );
};

export default MyEventsPage;
