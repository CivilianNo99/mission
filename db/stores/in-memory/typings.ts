import { Id } from '/db/id.ts'

export interface Item {
  id: Id
  jsonify(): ItemJsonRepr
}
export interface ItemJsonRepr {
  id: Id
}

export interface JsonRepr {
  items: ItemJsonRepr[]
}