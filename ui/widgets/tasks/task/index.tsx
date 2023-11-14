import { Kind } from "/db/tasks"
import { tasks } from "/db/tasks/store"
import { SomeActionOneTimeTaskUi } from "./some-action-one-time"
import { SameActionManyTimesTaskUi } from "./same-action-many-times"
import type { SomeActionOneTime } from "/db/tasks/SomeActionOneTime"
import type { SameActionManyTimesTask } from "/db/tasks/SameActionManyTimes"

interface Props {
  id: string
}

export function TaskUI({ id }: Props) {
  const task = tasks.useOne(id)

  return (
    task === null
      ? <div>Task not found</div>
      : task.kind === Kind.SomeActionOneTimeTask
        ? <SomeActionOneTimeTaskUi task={task as SomeActionOneTime} />
        : <SameActionManyTimesTaskUi task={task as SameActionManyTimesTask} />
  )
}
