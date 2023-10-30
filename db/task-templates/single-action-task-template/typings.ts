import { Null, msec } from "/utility/ulib.ts"
import { Due } from '/db/due-templates.ts'
import * as TaskTemplate from '../task-template.ts'

export interface Crg extends TaskTemplate.Crg {
  due: Null<Due.JsonRepr>
  description: string
  creationDate: msec
}
export interface JsonRepr extends TaskTemplate.JsonRepr {
  due: Null<Due.JsonRepr>
  description: string
  creationDate: msec
}