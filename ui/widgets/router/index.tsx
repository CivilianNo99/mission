import * as React from "react"
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
// import "./index.css";

const router = createBrowserRouter([{
  path: "/",
  element: <div>Hello world!</div>,
  // rendered when an uncaught error is thrown.
  // this component can read the error using "useRouteError"
  errorElement: <p> Unhandled error </p>,
}]);

const app = document.getElementById("app")
if (!app) {
  throw new Error("Could not find the apps\'s root element.")
}

ReactDOM.createRoot(app).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);