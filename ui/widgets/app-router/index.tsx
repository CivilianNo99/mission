import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([{
  path: "/",
  element: <div>Tasks View</div>,
}, {
  path: "/habits",
  element: <div>Habits View</div>,
}, {
  path: "/tasks",
  element: <div>Tasks View</div>
}, {
  path: "/task-creator",
  element: <div>Task Creator</div>
}, {
  path: "/habit-creator",
  element: <div>Habit Creator</div>
}, {
  path: "/task",
  element: <div>Task View</div>,
}, {
  path: "/habit",
  element: <div>Habit View</div>
}]);

export function AppRouter() {
  return <RouterProvider router={router} />
}