import { Null } from "../ulib";
import { $, $state } from "../react"
import { Store as IDbStore, Obj } from "../indexed-db";

export class Store<T extends Obj> extends IDbStore<T> {
  useOne(id: string) {
    const [item, wItem] = $state<Null<T>>(null)
    
    $([ id ], () => {
      return this.oneR(id).subscribe(wItem)
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