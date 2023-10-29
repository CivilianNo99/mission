import { Now } from '/utility/time.ts'
// import * as Recurrers from '../recurrers.ts'
import * as Task from '/db/tasks/task.ts'
import { Kind } from '/db/tasks/common.ts'
import { Null, msec } from '/utility/ulib.ts'
import { Crg, JsonRepr } from './typings.ts'
import { due } from '/db/dues.ts'

export enum Due {
  Now = 0,
  Hour = 1000 * 60 * 60,
  Day = Hour * 24,
  Week = Day * 30,
  Year = Day * 360,
}

export class SingleActionTask extends Task.Task {
  due: Null<due.Due>
  dueDate: Null<msec>
  // recurrer: Recurrers.recurrer.Recurrer
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

    // this.recurrer = Recurrers.fn.Fn.new(() => {
    //   // clone
    // })

    // this.recurrer = new Recurrer({})
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
      description: this.description,
      // dueDate: this.dueDate,
      isComplete: this.isComplete,
      creationDate: this.creationDate,
      completionDate: this.completionDate,
      due: this.due?.jsonify() ?? null,
    }
  }

  // recur() {
  //   this.owner.items.addOne(SingleActionTask.new({
  //     id: '',
  //     description: this.description,
  //     dueDate: null,
  //     // dueDate: this.dueDate.recur(),
  //     isComplete: false,
  //     creationDate: Now(),
  //     completionDate: null,
  //   }))
  // }

  /** 
   * Should be called before this obj is destroyed.
  */
  async destroy() {
    // await this.recurrer.apply()
  }

  static new(arg: Crg) {
    return new SingleActionTask(arg)
  }
}
