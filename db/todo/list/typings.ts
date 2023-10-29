import { Obj } from '/db.ts'
import * as TodoItem from '../item/typings.ts'
import * as InMemoryStore from '/db/stores/in-memory/typings.ts'

export enum ItemVisibility {
  ShowAll,
  ShowDue,
  ShowPending,
  ShowComplete,
}

export interface Crg extends Obj.Crg {
  name: string
  items: TodoItem.JsonRepr[]
  description: string
  itemVisibility: ItemVisibility
}

export interface JsonRepr extends Obj.JsonRepr {
  name: string
  items: InMemoryStore.JsonRepr
  description: string
  itemVisibility: ItemVisibility
}