import { useState } from "react"
import { SomeActionOneTimeTaskInputUI } from "./some-action-one-time"
import { SameActionManyTimesTaskInputUi } from "./same-action-many-times"

enum TaskType {
  SomeActionOneTime = "SomeActionOneTime",
  SameActionManyTimes = "SameActionManyTimes",
}

export function TaskCreatorUI() {
  const [taskType, wTaskType] = useState(TaskType.SomeActionOneTime)

  return (
    <div>
      Type:
      <select 
        value={taskType} 
        onChange={e => wTaskType(e.currentTarget.value as TaskType)}
      >
        <option value={TaskType.SomeActionOneTime}>Some Action One Time</option>
        <option value={TaskType.SameActionManyTimes}>Same Action Many Times</option>
      </select>

      {taskType === TaskType.SomeActionOneTime
        ? SomeActionOneTimeTaskInputUI()
        : SameActionManyTimesTaskInputUi()
      }
    </div>
  )
}