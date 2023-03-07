import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import EventsPage, { loader as eventLoader } from "./pages/Events";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as eventDetailAction,
} from "./pages/EventDetail";
import EditEventPage from "./pages/EditEvent";
import NewEventPage from "./pages/NewEvent";
import RootPage from "./pages/Root";
import EventsRoot from "./pages/EventsRoot";
import Error from "./pages/Error";
import { action as manipulateEventAction } from "./components/EventForm";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import { action as logoutAction } from "./pages/Logout";
import { tokenLoader, checkAuthToken } from "./util/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <Error />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: "events",
        element: <EventsRoot />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventLoader,
          },
          {
            path: ":id",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: eventDetailAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipulateEventAction,
                loader: checkAuthToken,
              },
            ],
          },
          {
            path: "new",
            action: manipulateEventAction,
            element: <NewEventPage />,
            loader: checkAuthToken,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
