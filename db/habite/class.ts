import { Id } from '/db/id.ts'
import type { Crg, JsonRepr, NewArg } from './typings.ts'
import * as Recurrer from '/db/recurrers/recurrer.ts'
import * as TaskTemplate from '/db/task-templates/task-template.ts'
import { Temporal } from '@js-temporal/polyfill'

/** 
 * A `Habit` is a recurring `Task`.
 * 
 * More technically, a `Habit` is a `Task` generator.
 * 
 * A `Habit` has a `TaskTemplate` which it uses to generate new `Task`s.
 * 
 * A `Habit` has a `Recurrer` that halps it know when to generate `Task`s and 
 * how many `Task`s to generate.
*/
export class Habit {
  readonly id: Id
  recurrer: Recurrer.Recurrer
  taskTemplate: TaskTemplate.TaskTemplate

  constructor(arg: Crg) {
    this.id = arg.id
    this.recurrer = arg.recurrer
    this.taskTemplate = arg.taskTemplate
  }

  #recur = () => {
    // return this.taskTemplate.create()
  }
  recur(now: Temporal.Instant) {
    this.recurrer.apply(now, this.#recur)
  }

  jsonify(): JsonRepr {
    return {
      id: this.id,
      recurrer: this.recurrer.jsonify(),
      taskTemplate: this.taskTemplate.jsonify(),
    }
  }

  static new(arg: NewArg) {
    return new Habit({
      id: arg.id || Id(),
      recurrer: arg.recurrer,
      taskTemplate: arg.taskTemplate,
    })
  }
}