import { Id } from '/db/id.ts'
import { Due } from '/db/dues.ts'
import { Task } from '/db/tasks/task.ts'
import { Kind } from '/db/tasks/common.ts'
import { Null } from '/utility/ulib.ts'
import { Temporal } from 'npm:@js-temporal/polyfill'
import { Crg, JsonRepr, NewArg } from './typings.ts'

export class SingleActionTask extends Task {
  due: Due.Due
  isComplete: boolean
  description: string
  creationInstant: Temporal.Instant
  completionInstant: Null<Temporal.Instant>
  
  constructor(arg: Crg) {
    super(arg)
    this.due = arg.due
    this.isComplete = arg.isComplete
    this.description = arg.description
    this.creationInstant = arg.creationInstant
    this.completionInstant = arg.completionInstant
  }

  get kind() {
    return Kind.SingleActionTask
  }

  get isDue() {
    return !this.isComplete && this.due.isDue
  }
  
  get isPending() {
    return !this.isComplete && !this.due.isDue
  }

  isDueIn(duration: Temporal.Duration) {
    return !this.isComplete && this.due.isDueIn(duration)    
  }

  isDueAt(instant: Temporal.Instant) {
    return !this.isComplete && this.due.isDueAt(instant)    
  }

  complete() {
    this.isComplete = true
  }

  uncomplete() {
    this.isComplete = false
  }

  jsonify(): JsonRepr {
    return {
      ...super.jsonify(),
      due: this.due.jsonify(),
      description: this.description,
      isComplete: this.isComplete,
      creationInstant: this.creationInstant.toString(),
      completionInstant: this.completionInstant?.toString() ?? null,
    }
  }

  static new(arg: NewArg) {
    return new SingleActionTask({
      id: arg.id || Id(),
      due: arg.due,
      isComplete: false,
      description: arg.description,
      creationInstant: Temporal.Now.instant(),
      completionInstant: null,
    })
  }
}
