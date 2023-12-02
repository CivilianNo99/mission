import { Kind } from "/db/tasks"
import { tasks } from "/db/tasks/store"
import { TaskViewSmallSomeActionOneTime } from "../TaskViewSmallSomeActionOneTime"
import { TaskViewSmallSameActionManyTimes } from "../TaskViewSmallSameActionManyTimes/same-action-many-times"
import type { SomeActionOneTime } from "/db/tasks/SomeActionOneTime"
import type { SameActionManyTimesTask } from "/db/tasks/SameActionManyTimes"

interface Props {
  id: string
}

export function TaskViewSmall({ id }: Props) {
  const task = tasks.useOne(id)

  return (
    task === null
      ? <div>Task not found</div>
      : task.kind === Kind.SomeActionOneTimeTask
        ? <TaskViewSmallSomeActionOneTime task={task as SomeActionOneTime} />
        : <TaskViewSmallSameActionManyTimes task={task as SameActionManyTimesTask} />
  )
}
