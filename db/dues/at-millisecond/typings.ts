import { msec } from '/utility/ulib.ts'
import * as Due from '../due.ts'

export interface Crg extends Due.Crg {
  at: msec
}
export interface JsonRepr extends Due.JsonRepr {
  at: msec
}