// import React from "react"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import { Habits } from "./habits"
import { TasksUI } from "./tasks"

export function Main() {
  return (
    <Tabs
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="tasks" title="Tasks">
        <TasksUI />
      </Tab>

      <Tab eventKey="habits" title="Habits">
        <Habits />
      </Tab>
    </Tabs>
  )
}