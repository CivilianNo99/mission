import { SomeActionOneTime } from "/db/tasks/SomeActionOneTime"
import { Card } from "/ui/widgets/card"
import { tasks } from "/db/tasks/store"
import { OptionsUI } from "./options"
import css from "./style.module.css"

interface Props {
  task: SomeActionOneTime
}

export function SomeActionOneTimeTaskUi({ task }: Props) {
  function toggleIsComplete() {
    if (task) {
      task.isComplete = !task.isComplete
      tasks.put(task)
    }
  }
 
  return (
    <Card className={css.wrap}>
      <input 
        type="checkbox"
        checked={task.isComplete}
        onChange={toggleIsComplete}
      />
      
      <div>{task.description}</div>

      <OptionsUI taskId={task.id} />
    </Card>
  )
}