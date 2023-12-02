import * as Task from "./Task"
import * as SomeActionOneTime from "./SomeActionOneTime"
import * as SameActionManyTimes from "./SameActionManyTimes"
import { Temporal } from "npm:@js-temporal/polyfill"

export enum Kind {
  SomeActionOneTimeTask,
  CheckboxList,
  RadioList,
  Timer,
  Rundown,
  SameActionManyTimesTask,
}

function isSomeActionOneTimeTaskJsonRepr(jsonRepr: Task.JsonRepr)
  : jsonRepr is SomeActionOneTime.JsonRepr 
{
  return jsonRepr.kind === Kind.SomeActionOneTimeTask
}
function isSameActionManyTimesTaskJsonRepr(jsonRepr: Task.JsonRepr)
  : jsonRepr is SameActionManyTimes.JsonRepr 
{
  return jsonRepr.kind === Kind.SameActionManyTimesTask
}

export function initialize(jsonRepr: Task.JsonRepr) {
  if (isSomeActionOneTimeTaskJsonRepr(jsonRepr)) {
    return new SomeActionOneTime.SomeActionOneTime({
      id: jsonRepr.id,
      title: jsonRepr.title,
      timeDue: jsonRepr.timeDue ? Temporal.Instant.from(jsonRepr.timeDue) : null,
      timeStale: jsonRepr.timeStale ? Temporal.Instant.from(jsonRepr.timeStale) : null,
      isComplete: jsonRepr.isComplete,
      description: jsonRepr.description,
      timeCreated: Temporal.Instant.from(jsonRepr.timeCreated),
      timeCompleted: jsonRepr.timeCompleted ? Temporal.Instant.from(jsonRepr.timeCompleted) : null,
    })
  }
  
  if (isSameActionManyTimesTaskJsonRepr(jsonRepr)) {
    return new SameActionManyTimes.SameActionManyTimesTask({
      id: jsonRepr.id,
      title: jsonRepr.title,
      timeDue: jsonRepr.timeDue ? Temporal.Instant.from(jsonRepr.timeDue) : null,
      timeStale: jsonRepr.timeStale ? Temporal.Instant.from(jsonRepr.timeStale) : null,
      description: jsonRepr.description,
      timeCreated: Temporal.Instant.from(jsonRepr.timeCreated),
      timeCompleted: jsonRepr.timeCompleted ? Temporal.Instant.from(jsonRepr.timeCompleted) : null,
      timesActionMustBePerformed: jsonRepr.timesActionMustBePerformed,
      timesActionPerformed: jsonRepr.timesActionPerformed,
    })
  }

  console.log(jsonRepr)
  throw new TypeError("Invalid task json repr.")
}