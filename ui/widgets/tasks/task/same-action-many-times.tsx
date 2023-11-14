import { Card } from "/ui/widgets/card"
import { SameActionManyTimesTask } from "/db/tasks/SameActionManyTimes"
import { FaMinus, FaPlus } from "react-icons/fa6"

interface Props {
  task: SameActionManyTimesTask
}

export function SameActionManyTimesTaskUi({ task }: Props) {
  return (
    <Card>
      <button>
        <FaMinus />
      </button>

      <p>{task.description}</p>

      <button>
        <FaPlus />
      </button>
    </Card>
  )
}