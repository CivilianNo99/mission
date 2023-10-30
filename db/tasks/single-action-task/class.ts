import { Now } from '/utility/time.ts'
// import * as Recurrers from '../recurrers.ts'
import * as Task from '/db/tasks/task.ts'
import { Kind } from '/db/tasks/common.ts'
import { Null, msec } from '/utility/ulib.ts'
import { Crg, JsonRepr } from './typings.ts'
import { Due } from '/db/dues.ts'

export enum Due {
  Now = 0,
  Hour = 1000 * 60 * 60,
  Day = Hour * 24,
  Week = Day * 30,
  Year = Day * 360,
}

export class SingleActionTask extends Task.Task {
  due: Null<Due.Due>
  dueDate: Null<msec>
  isComplete: boolean
  description: string
  creationDate: msec
  completionDate: Null<msec>
  
  constructor(arg: Crg) {
    super(arg)
    this.due = null
    this.description = arg.description
    this.dueDate = 0 // arg.dueDate
    this.isComplete = arg.isComplete
    this.creationDate = arg.creationDate
    this.completionDate = arg.completionDate
  }

  get kind() {
    return Kind.SingleActionTask
  }

  get isDue() {
    return this.isDueIn(Due.Now)
  }
  
  get isPending() {
    return !this.isComplete 
      && this.dueDate !== null 
      && this.dueDate < Now()
  }

  isDueIn(period: Due) {
    return !this.isComplete 
      && this.dueDate !== null 
      && this.dueDate + period >= Now()
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
      due: this.due?.jsonify() ?? null,
      description: this.description,
      isComplete: this.isComplete,
      creationDate: this.creationDate,
      completionDate: this.completionDate,
    }
  }

  /** 
   * Should be called before this obj is destroyed.
  */
  async destroy() {
    // add an event that is obj was destroyed.
    // await this.recurrer.apply()
  }

  static new(arg: Crg) {
    return new SingleActionTask(arg)
  }
}
