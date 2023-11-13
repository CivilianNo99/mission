import { Id } from "/db/id.ts"
import type { Crg, JsonRepr, NewArg } from "./typings"
import * as Recurrer from "/db/Recurrers/Recurrer"
import * as Recurrers from "/db/Recurrers"
import * as TaskTemplate from "/db/Tasks/Templates/Task"
import * as TaskTemplates from "/db/tasks/Templates"
import { Temporal } from "npm:@js-temporal/polyfill"
import { habits } from "../store"

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
  /** 
   * Habit description
  */
  description: string
  recurrer: Recurrer.Recurrer
  task: TaskTemplate.TaskTemplate

  constructor(arg: Crg) {
    this.id = arg.id
    this.task = arg.task
    this.recurrer = arg.recurrer
    this.description = arg.description
  }

  #recur = (now: Temporal.Instant) => {
    this.task.create(now)
  }
  async recur(now?: Temporal.Instant) {
    await this.recurrer.apply(Temporal.Now.instant(), this.#recur)
    await this.save()
  }

  toJSON(): JsonRepr {
    return {
      id: this.id,
      task: this.task.toJSON(),
      recurrer: this.recurrer.toJSON(),
      description: this.description,
    }
  }

  static new(arg: NewArg) {
    return new Habit({
      id: arg.id || Id(),
      task: arg.task,
      recurrer: arg.recurrer,
      description: arg.description,
    })
  }

  static fromJson(json: JsonRepr) {
    return new Habit({
      id: json.id,
      task: TaskTemplates.initialize(json.task),
      recurrer: Recurrers.initialize(json.recurrer),
      description: json.description,
    })
  }

  save() {
    return habits.put(this)
  }
}