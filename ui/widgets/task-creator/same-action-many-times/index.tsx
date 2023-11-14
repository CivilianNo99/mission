import { tasks } from "/db/tasks/store"
import { SomeActionOneTime } from "/db/tasks/SomeActionOneTime"
import { Temporal } from "@js-temporal/polyfill";
import { useState } from "react";

export function SameActionManyTimesTaskInputUi() {
  const [description, wDescription] = useState<string>("")
  const [timeDue, wTimeDue] = useState<number>(0)
  const [timeStale, wTimeStale] = useState<number>(0)

  // function create(e: KeyboardEvent) {
  //   if (e.key === "Enter") {
  //     if (description) {
  //       tasks.add(SomeActionOneTime.new({
  //         description: description,
  //         timeDue: timeDue === undefined 
  //           ? null 
  //           : new Temporal.Instant(BigInt(new Date(timeDue).getTime())),
  //         timeStale: timeStale === undefined 
  //           ? null 
  //           : new Temporal.Instant(BigInt(new Date(timeStale).getTime())),
  //       }))

  //       description = ''
  //     }
  //   }
  // }

  return (
    <div className="creator">
      <input 
        type="text" 
        placeholder="Description"
        value={description}
        onChange={e => wDescription(e.currentTarget.value)}
        // onKeydown={create}
      />

      <input 
        type="datetime-local" 
        placeholder="When is this task due"
        value={timeDue} 
        onChange={e => wTimeDue(parseInt(e.currentTarget.value))}
      />

      <input 
        type="datetime-local"
        placeholder="When is this task stale"
        value={timeStale}
        onChange={e => wTimeStale(parseInt(e.currentTarget.value))}
      />
    </div>
  )
}