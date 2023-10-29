import { Kind } from "../common.ts"
import { msec } from "/utility/ulib.ts"

export interface Crg {
  dueAfter: msec
}
export interface JsonRepr {
  dueAfter: msec
  kind: Kind
}