import css from "./style.module.scss"
import { useState } from "react"
import { tasks } from "/db/tasks/store"
import { Checkbox } from "@mui/material"
import { SomeActionOneTime } from "/db/tasks/SomeActionOneTime"
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";


interface Props {
  task: SomeActionOneTime
}

export function TaskViewSmallSomeActionOneTime({ task }: Props) {
  // const [_, rerender] = useState(false)

  function toggle() {
    if (task) {
      task.isComplete = !task.isComplete
      // task.isComplete = newValue
      tasks.put(task)
      // rerender(!_)
    }
  }

  return (
    <div className={css.wrap}>
      <div className={task.isComplete ? css.checked : ''}>
        <button onClick={toggle}>
          {task.isComplete
            ? <FaCheck />
            : null
          }
        </button>
      </div>
      
      <div>
        <p>{task.title}</p>
      </div>

      <div>
        <button>
          <FaEllipsisVertical />
        </button>
      </div>
    </div>
  )
}