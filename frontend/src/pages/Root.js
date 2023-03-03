import MainNavigation from "./../components/MainNavigation";
import { Outlet } from "react-router-dom";
import classes from "./Root.module.css";

const RootPage = () => {
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
