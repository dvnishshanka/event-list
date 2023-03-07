// import { useState } from "react";
import {
  useSearchParams,
  Form,
  Link,
  useActionData,
  useNavigation,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  // const [isLogin, setIsLogin] = useState(true);

  // function switchAuthHandler() {
  //   setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  // }

  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  return (
    <Form method="post" className={classes.form}>
      <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
      {actionData && actionData.errors && (
        <ul>
          {Object.values(actionData.errors).map((error) => {
            return <li key={error}>{error}</li>;
          })}
        </ul>
      )}
      {actionData && actionData.message && <p>{actionData.message}</p>}
      <p>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" required />
      </p>
      <div className={classes.actions}>
        {/* <button onClick={switchAuthHandler} type="button">
            {isLogin ? "Create new user" : "Login"}
          </button> */}

        <Link to={`/auth?mode=${isLogin ? "signup" : "login"}`}>
          {isLogin ? "Create new user" : "Login"}
        </Link>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default AuthForm;
