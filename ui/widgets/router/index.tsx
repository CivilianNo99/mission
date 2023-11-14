import * as React from "react"
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Habits } from "../habits";
import { TasksUI } from "../tasks";
import { TaskCreatorUI } from "../task-creator";
import { HabitCreatorUI } from "../habit-creator";
import { TaskUI } from "../task";
import { HabitUI } from "../habit";
// import "./index.css";

const router = createBrowserRouter([{
  path: "/",
  element: <div>Hello world!</div>,
  // rendered when an uncaught error is thrown.
  // this component can read the error using "useRouteError"
  errorElement: <p> Unhandled error </p>,
}, {
  path: "/habits",
  element: <Habits />,
}, {
  path: "/tasks",
  element: <TasksUI />
}, {
  path: "/create-task",
  element: <TaskCreatorUI />
}, {
  path: "/create-habit",
  element: <HabitCreatorUI />
}, {
  path: "/task",
  element: <TaskUI />,
}, {
  path: "/habit",
  element: <HabitUI />
}]);

export function AppRouter() {
  return (
    <RouterProvider router={router} />
  )
}