import MainNavigation from "./../components/MainNavigation";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import classes from "./Root.module.css";
import { useEffect } from "react";
import { getAuthDuration } from "../util/auth";

const RootPage = () => {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
    }
    const tokenDuration = getAuthDuration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main className={classes.content}>
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default RootPage;
