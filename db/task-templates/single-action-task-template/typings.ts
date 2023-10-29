import { Id } from '/db/id.ts'
import { Null, msec } from "/utility/ulib.ts"
import { Due } from '/db/due-templates.ts'

export interface Crg {
  id: Id
  due: Null<Due.JsonRepr>
  description: string
  creationDate: msec
}
export interface JsonRepr {
  id: Id
  due: Null<Due.JsonRepr>
  description: string
  creationDate: msec
}