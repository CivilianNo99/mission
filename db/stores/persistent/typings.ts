import { Id } from '/db/id.ts'

export interface Item {
  readonly id: Id
  jsonify(): ItemJsonRepr
}
export interface ItemJsonRepr {
  readonly id: Id
}