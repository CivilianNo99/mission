import { Temporal } from "@js-temporal/polyfill"
import { AppRouter } from "../app-router"
import { TaskView } from "../task-view"
import { TaskViewSmall } from "../TaskViewSmall"
import { TaskViewSmallSameActionManyTimes } from "../TaskViewSmallSameActionManyTimes/same-action-many-times"
import { SomeActionOneTime } from "/db/tasks/SomeActionOneTime"
import { TaskViewSmallSomeActionOneTime } from "../TaskViewSmallSomeActionOneTime"
import { Checkbox } from "../checkbox"
import { useState } from "react"
import { SameActionManyTimesTask } from "/db/tasks/SameActionManyTimes"
import { Card } from "../card"
import { TasksView } from "../TasksView"

export function App() {
  return (
    // <AppRouter />

    // <TaskView />

    // <TestTaskViewSmallSomeActionOneTine />
    // <TestTaskViewSmallSameActionManyTimes />

    // <TestCheckbox />

    // <Card />
    <TasksView />
  )
} 

function TestCheckbox() {
  const [checked, wChecked] = useState(false)

  return (
    <div style={{
      // backgroundColor: "blue"
    }}>
      <Checkbox checked={checked} onChange={wChecked}/>
    </div>
  )
}

function TestTaskViewSmallSomeActionOneTine() {
  let task = new SomeActionOneTime({
    id: crypto.randomUUID(),
    title: "Wash your cat.",
    description: "description",
    isComplete: false,
    timeCompleted: null,
    timeCreated: Temporal.Now.instant(),
    timeDue: null,
    timeStale: null,
  })

  return <TaskViewSmallSomeActionOneTime task={task} />
}
function TestTaskViewSmallSameActionManyTimes() {
  const task = new SameActionManyTimesTask({
    id: crypto.randomUUID(),
    description: "description",
    timeCompleted: null,
    timeCreated: Temporal.Now.instant(),
    timeDue: null,
    timesActionMustBePerformed: 10,
    timesActionPerformed: 0,
    timeStale: null,
    title: "Do push up",
  })

  return <TaskViewSmallSameActionManyTimes task={task} />
}