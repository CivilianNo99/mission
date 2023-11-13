import { Null } from "../ulib";
import { Habit } from "/db/habits/Habite"
import { habits } from "/db/habits/store"
import { $, $state } from "../react"
import { Store as IDbStore, Obj } from "../indexed-db";

export class Store<T extends Obj> extends IDbStore<T> {
  useOne(id: string) {
    const [item, wItem] = $state<Null<Habit>>(null)
    
    $([ id ], () => {
      return habits.oneR(id).subscribe(wItem)
    })
    
    return item
  }

  useMany(ids: string[]) {
    const [items, wItems] = $state<T[]>([])

    $(ids, () => {
      return this.manyR(ids).subscribe(wItems)
    })

    return items
  }

  useAll() {
    const [items, wItems] = $state<T[]>([])

    $([], () => {
      return this.allR().subscribe(wItems)
    })

    return items
  }
}