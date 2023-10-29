import * as Due from '../due.ts'

export interface Crg extends Due.Crg {
  from: number
  dueAfter: number
}
export interface JsonRepr extends Due.JsonRepr {
  from: number
  dueAfter: number
}