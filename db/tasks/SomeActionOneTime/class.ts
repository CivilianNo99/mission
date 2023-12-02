import { Id } from '/db/id.ts'
import { Task } from '../Task/index.ts'
import { Kind } from '/db/tasks/common.ts'
import type { Crg, JsonRepr, NewArg } from './typings.ts'
import { Temporal } from '@js-temporal/polyfill'

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

  toJSON(): JsonRepr {
    return {
      ...super.toJSON(),
      isComplete: this.isComplete,
    }
  }

  // acept a now arg
  static new(arg: NewArg) {
    return new SomeActionOneTime({
      id: arg.id || Id(),
      title: arg.title,
      timeDue: arg.timeDue ?? null,
      timeStale: arg.timeStale ?? null,
      isComplete: false,
      description: arg.description ?? "",
      timeCreated: arg.now ?? Temporal.Now.instant(),
      timeCompleted: null,
    })
  }
}