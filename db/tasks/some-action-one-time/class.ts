import { Id } from '/db/id.ts'
import { Task } from '/db/tasks/task.ts'
import { Kind } from '/db/tasks/common.ts'
import { Temporal } from 'npm:@js-temporal/polyfill'
import { Crg, JsonRepr, NewArg } from './typings.ts'

export class SomeActionOneTime extends Task {
  isComplete: boolean
  
  constructor(arg: Crg) {
    super(arg)
    this.isComplete = arg.isComplete
  }

  get kind() {
    return Kind.SomeActionOneTimeTask
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
      isComplete: this.isComplete,
    }
  }

  // acept a now arg
  static new(arg: NewArg) {
    return new SomeActionOneTime({
      id: arg.id || Id(),
      timeDue: arg.timeDue,
      timeStale: arg.timeStale,
      isComplete: false,
      description: arg.description,
      timeCreated: arg.now,
      timeCompleted: null,
    })
  }
}