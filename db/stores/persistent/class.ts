import { Id } from '/db/id.ts'
import { Null } from "/utility/ulib.ts"
import { Item, ItemJsonRepr } from "./typings.ts"

export class Store<T extends Item> {
  async addOne(item: T) {
    return item
  }
  async addMany(items: T[]) {}
  async findOne(itemId: Id): Promise<Null<T>> {
    return null
  }
  async findMany(itemIds: Id[]): Promise<T[]> {
    return []
  }

  * items(): Generator<T> {

  }
}