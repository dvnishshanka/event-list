import { useRouteLoaderData, json, redirect } from "react-router-dom";
import EventItem from "../components/EventItem";
import { getAuthToken } from "./../util/auth";

const EventDetailPage = () => {
  const eventData = useRouteLoaderData("event-detail");

  return <EventItem event={eventData.event} />;
};

export default EventDetailPage;

export const loader = async ({ request, params }) => {
  const eventId = params.id;

  const response = await fetch("http://localhost:8080/events/" + eventId);

  if (!response.ok) {
    json(
      { message: "Could not fetch the details of selected event" },
      { status: 500 }
    );
  } else {
    return response;
  }
};

export const action = async ({ request, params }) => {
  const token = getAuthToken();
  const response = await fetch("http://localhost:8080/events/" + params.id, {
    method: request.method,
    headers: { Authorization: "Bearer " + token },
  });
  if (!response.ok) {
    throw json({ message: "Could not delete the event" }, { status: 500 });
  }
  return redirect("/events");
};
