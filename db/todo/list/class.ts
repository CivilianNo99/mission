import { Obj } from '/db.ts'
import { SingleActionTask } from '../item.ts'
import { InMemoryStore } from '/db/stores/in-memory.ts'
import { JsonRepr, Crg, ItemVisibility } from './typings.ts'

export class TodoList extends Obj.Obj {
  name: string
  description: string
  itemVisibility: ItemVisibility
  readonly items: InMemoryStore<SingleActionTask>

  constructor(arg: Crg) {
    super(arg)
    this.name = arg.name
    this.items = new InMemoryStore(arg.items.map(arg => new SingleActionTask(arg)))
    this.description = arg.description
    this.itemVisibility = arg.itemVisibility
  }

  jsonify(): JsonRepr {
    return {
      ...super.jsonify(),
      name: this.name,
      items: this.items.jsonify(),
      description: this.description,
      itemVisibility: this.itemVisibility,
    }
  }

  iterVisibleItems() {
    switch (this.itemVisibility) {
      case ItemVisibility.ShowAll: return this.iterAll()
      case ItemVisibility.ShowDue: return this.iterDue()
      case ItemVisibility.ShowPending: return this.iterPending()
      case ItemVisibility.ShowComplete: return this.iterComplete()
    }
  }
  private * iterAll() {
    for (const item of this.items) {
      yield item
    }
  }
  private * iterDue() {
    for (const item of this.items) {
      if (item.isDue) {
        yield item
      }
    }
  }
  
  private * iterPending() {
    for (const item of this.items) {
      if (item.isPending) {
        yield item
      }
    }
  }
  private * iterComplete() {
    for (const item of this.items) {
      if (item.isComplete) {
        yield item
      }
    }
  }
}