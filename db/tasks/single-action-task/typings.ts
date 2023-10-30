import { Null, msec } from '/utility/ulib.ts'
import * as Task from '/db/tasks/task.ts'
import { Due } from '/db/dues.ts'

export interface Crg extends Task.Crg {
  due: Null<Due.JsonRepr>
  // dueDate: Null<msec>
  isComplete: boolean
  description: string
  creationDate: msec
  completionDate: Null<msec>
}

export interface NewArg extends Task.NewArg {
  due: Null<Due.Due>
  // dueDate: Null<msec>
  isComplete: boolean
  description: string
  creationDate: msec
  completionDate: Null<msec>
}

export interface JsonRepr extends Task.JsonRepr {
  due: Null<Due.JsonRepr>
  // dueDate: Null<msec>
  isComplete: boolean
  description: string
  creationDate: msec
  completionDate: Null<msec>
}