import { Id } from "/db/id.ts"
import { Kind } from "../common.ts"

export interface Crg {
  id: Id
}
export interface NewArg {}
export interface JsonRepr {
  id: Id
  kind: Kind
}