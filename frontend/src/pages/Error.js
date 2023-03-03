import PageContent from "../components/PageContent";
import MainNavigation from "./../components/MainNavigation";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  let title = "An error occured!";
  let message = "Something went wrong.";

  if (error.status === 500) {
    // message = JSON.parse(error.data).message;

    message = error.data.message; // When using json utility function JSON.parse is not required
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find message or resource.";
  }
  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};

export default Error;
