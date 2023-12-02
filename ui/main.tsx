import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from "./widgets/app"

const app = document.getElementById("app")
if (!app) {
  throw new Error("Could not find the apps\'s root element.")
}

ReactDOM.createRoot(app).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
