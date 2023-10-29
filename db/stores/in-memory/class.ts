import { Id } from '/db/id.ts'
import { Item, JsonRepr } from './typings.ts'

export class InMemoryStore<T extends Item> {
  constructor(private readonly items: T[] = []) {}

  get length() {
    return this.items.length
  }
  
  addOne(item: T) {
    this.items.push(item)
  }

  removeOne(itemId: Id) {
    const idx = this.items.findIndex(item => item.id === itemId)
    if (idx !== -1) {
      this.items.splice(idx, 1)
    }
  }

  findOne(itemId: Id) {
    return this.items.find(item => item.id === itemId) ?? null
  }

  findMany(itemIds: Id[]) {
    return this.items.filter(item => itemIds.includes(item.id))
  }

  jsonify(): JsonRepr {
    return {
      items: this.items.map(item => item.jsonify())
    }
  }

  [Symbol.iterator]() {
    return this.items.values()
  }
}