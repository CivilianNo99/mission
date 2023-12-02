import css from "./style.module.scss"
import { useState } from "react"
import { SameActionManyTimesTask } from "/db/tasks/SameActionManyTimes"
import { FaEllipsisVertical, FaMinus, FaPlus } from "react-icons/fa6"
import { tasks } from "/db/tasks/store"

interface Props {
  task: SameActionManyTimesTask
}

export function TaskViewSmallSameActionManyTimes({ task }: Props) {
  // const [_, rerender] = useState(false)

  function _do() {
    task.do()
    tasks.put(task)
    // rerender(!_)
  }
  
  function undo() {
    task.undo()
    tasks.put(task)

    // rerender(!_)
  }

  return (
    <div className={css.wrap}>
      <div>
        <button onClick={undo}>
          <FaMinus />
        </button>
      </div>

      <div>
        <p>{task.title}</p>
        <button>
          <FaEllipsisVertical />
        </button>
        <div>{task.timesActionPerformed} | {task.timesActionMustBePerformed}</div>
      </div>

      <div>
        <button onClick={_do}>
          <FaPlus />
        </button>
      </div>
    </div>
  )
}