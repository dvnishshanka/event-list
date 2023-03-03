import EventsList from "./../components/EventsList";
import { useLoaderData, json } from "react-router-dom";

const DUMMY_EVENTS = [
  {
    id: "e1",
    title: "Museum Sunday",
    date: "2023.02.28",
    image:
      "https://www.museumsportal-berlin.de/media/CACHE/images/2c6ac7158a00d514344d0a290518af8c.jpg",
  },
  {
    id: "e2",
    title: "Wedding",
    date: "2023.02.20",
    image:
      "https://assets.vogue.com/photos/629a53cbdc88bf0e756bf8a9/4:3/w_908,h_681,c_limit/Wedding-32.jpg",
  },
  {
    id: "e3",
    title: "Independence Day",
    date: "2023.02.20",
    image:
      "https://i.pinimg.com/originals/f8/a9/e7/f8a9e705caafa4d375278970b2445de6.jpg",
  },
];

const EventsPage = () => {
  const fetchedEvents = useLoaderData();

  return <EventsList events={fetchedEvents} />;
};

export default EventsPage;

export async function loader() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
    //   status: 500,
    // });

    // Simplify above using json
    throw json({ message: "Could not fetch events" }, { status: 500 });
  } else {
    const eventData = await response.json();

    return eventData.events;
  }
}
