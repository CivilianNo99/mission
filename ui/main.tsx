import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import {} from "bootstrap/dist/css/bootstrap.css"
import { AppRouter } from "./widgets/router"

const app = document.getElementById("app")
if (!app) {
  throw new Error("Could not find the apps\'s root element.")
}

ReactDOM.createRoot(app).render(
  <React.StrictMode>
    {/* <App /> */}
    <AppRouter />
  </React.StrictMode>,
)
