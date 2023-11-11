import { purePutOrPushItemOnce } from "./utility"
import type { Obj } from "./obj"
import type { Subscriptor, Observable } from "./observable"
import type { AddMutation, ClearMutation, DeleteMutation, PutMutation } from "./mutations"
import { stale } from "./dispatch"

export enum QueryType {
  Get,
  GetAll,
  GetKey,
  GetAllKeys,
  Count,
}

export interface QueryArg<Value> {
  readonly database: string
  readonly store: string
  value: Value
}

export interface CountQueryArg extends QueryArg<number> {

}
export interface GetQueryArg<Value extends Obj> extends QueryArg<Value | null> {
  readonly id: string
}
export interface GetKeyQueryArg extends QueryArg<string | null> {
  readonly id: string
}
export interface GetAllQueryArg<Value extends Obj> extends QueryArg<Value[]> {
  readonly ids: string[]
  max?: number
}
export interface GetAllKeysQueryArg extends QueryArg<string[]> {
  readonly ids: string[]
  max?: number
}

export class Query<Value> implements Observable<Value> {
  value
  readonly store
  readonly database
  private readonly subscriptions: [symbol, Subscriptor<Value>][] = []

  constructor(arg: QueryArg<Value>) {
    this.value = arg.value
    this.store = arg.store
    this.database = arg.database
  }
  
  onAdd(mutation: AddMutation<any>) {}
  onPut(mutation: PutMutation<any>) {}
  onClear(mutation: ClearMutation) {}
  onDelete(mutation: DeleteMutation) {}

  set(value: Value): void {
    this.value = value

    for (const [_, subscriptor] of this.subscriptions) {
      subscriptor(value)
    }
  }
  subscribe(subscriptor: Subscriptor<Value>) {
    subscriptor(this.value)

    const id = Symbol()
    this.subscriptions.push([id, subscriptor])

    return () => this.unsubscribe(id)
  }
  unsubscribe(id: symbol) {
    const idx = this.subscriptions.findIndex(subscriptor => subscriptor[0] === id)
    if (idx !== -1) {
      this.subscriptions.splice(idx, 1)
    }
    if (this.subscriptions.length === 0) {
      stale(this)
    }
  }
} 

export class GetOneQuery<Value extends Obj> extends Query<Value | null> {
  readonly id
  constructor(arg: GetQueryArg<Value>) {
    super(arg)
    this.id = arg.id
  }

  override onDelete(mutation: DeleteMutation): void {
    if (
      mutation.database === this.database
      &&
      mutation.store === this.store
      &&
      this.id == mutation.key
    ) {
      this.set(null)
    }
  }

  override onClear(mutation: ClearMutation): void {
    if (
      mutation.database === this.database 
      && 
      mutation.store === this.store
    ) {
      this.set(null)
    }
  }

  onPut(mutation: PutMutation<Value>): void {
    if (
      mutation.database === this.database
      &&
      mutation.store === this.store
      &&
      mutation.value.id === this.id
    ) {
      this.set(mutation.value)
    }
  }
}
export class GetManyQuery<Value extends Obj> extends Query<Value[]> {
  readonly ids

  constructor(arg: GetAllQueryArg<Value>) {
    super(arg)
    this.ids = arg.ids
  }

  onClear(mutation: ClearMutation): void {
    if (
      mutation.database === this.database 
      && 
      mutation.store === this.store
    ) {
      this.set([])
    }
  }

  onDelete(mutation: DeleteMutation): void {
    if (
      mutation.database === this.database
      &&
      mutation.store === this.store
      &&
      this.ids.includes(mutation.key)
    ) {
      this.set(this.value.filter(item => item.id !== mutation.key))
    }
  }

  onAdd(mutation: AddMutation<Value>): void {
    if (
      mutation.database === this.database
      &&
      mutation.store === this.store
      &&
      this.ids.includes(mutation.value.id)
    ) {
      this.set([ ...this.value, mutation.value ])
    }
  }

  onPut(mutation: PutMutation<Value>): void {
    if (
      mutation.database === this.database
      &&
      mutation.store === this.store
    ) {
      this.set(purePutOrPushItemOnce(
        this.value, 
        mutation.value,
        item => item.id === mutation.value.id
      ))
    }
  }
}

// export class GetKeyQuery extends Query<string | null> {
//   readonly query

//   constructor(arg: GetKeyQueryArg) {
//     super(arg)
//     this.query = arg.id
//   }

//   onClear(mutation: ClearMutation): void {
//     if (
//       mutation.database === this.database
//       && 
//       mutation.store === this.store
//     ) {
//       this.set(null)
//     }
//   }

//   onDelete(mutation: DeleteMutation): void {
//     if (
//       mutation.database === this.database
//       &&
//       mutation.store === this.store
//       &&
//       eq(mutation.key, this.query)
//     ) {
//       this.set(null)
//     }
//   }

//   onPut(mutation: PutMutation<Obj>): void {
//     if (
//       mutation.database === this.database
//       &&
//       mutation.store === this.store
//       &&
//       eq(mutation.value.id, this.query)
//     ) {
//       this.set(mutation.value.id)
//     }
//   }
// }

// export class GetAllKeysQuery extends Query<string[]> {
//   readonly max?
//   readonly query

//   constructor(arg: GetAllKeysQueryArg) {
//     super(arg)
//     this.max = arg.max
//     this.query = arg.ids
//   }

//   onClear(mutation: ClearMutation): void {
//     if (
//       mutation.database === this.database
//       &&
//       mutation.store === this.store
//     ) {
//       this.set([])
//     }
//   }

//   onDelete(mutation: DeleteMutation): void {
//     if (
//       mutation.database === this.database
//       &&
//       mutation.store === this.store
//     ) {
//       this.set(this.value.filter(key => key !== mutation.key))
//     }
//   }

//   onAdd(mutation: AddMutation<Obj>): void {
//     if (
//       mutation.database === this.database
//       &&
//       mutation.store === this.store
//       &&
//       eq(mutation.value.id, this.query)
//     ) {
//       this.set([ ...this.value, mutation.value.id ])
//     }
//   }

//   onPut(mutation: PutMutation<Obj>): void {
//     if (
//       mutation.database === this.database
//       &&
//       mutation.store === this.store
//       &&
//       eq(mutation.value.id, this.query)
//     ) {
//       this.set(purePutOrPushItemOnce(
//         this.value,
//         mutation.value.id,
//         key => key === mutation.value.id
//       ))
//     }
//   }
// }

// function eq(key: string, other: string | string[] | IDBKeyRange) {
//   if (typeof other === "string") {
//     return key === other
//   } else if (Array.isArray(other)) {
//     return 
//   } else {
//     return other.includes(key)
//   }
// }
// type DBValidKey = string | number | Date | DBValidKey[]
// type Key = DBValidKey | IDBKeyRange
// enum KeyType {
//   KeyRange,
//   String,
//   Array,
//   Date,
//   Number,
// }
// function keyType(key: Key) {
//   if (typeof key === "string") {
//     return KeyType.String
//   }
//   if (typeof key === "number") {
//     return KeyType.Number
//   }
//   if (Array.isArray(key)) {
//     return KeyType.Array
//   }
//   if (key instanceof Date) {
//     return KeyType.Date
//   }
//   if (key instanceof IDBKeyRange) {
//     return KeyType.KeyRange
//   }

// }
// function keyEq(a: Key, b: Key): boolean {
//   const aType = keyType(a)
//   const bType = keyType(b)

//   switch (aType) {
//     case KeyType.String:
//       switch (bType) {
//         case KeyType.String: return a === b
//         case KeyType.Number: return false
//         case KeyType.Date: return false
//         case KeyType.KeyRange: return (b as IDBKeyRange).includes(a)
//         case KeyType.Array: return (b as DBValidKey[]).every(b => keyEq(a, b))
//       }
    
//     case KeyType.Number:
//       switch (bType) {
//         // We use `Object.is` instead of `===` to correctly handle `NaN` values:
//         // `keyEq` considers `NaN` to be equal to itself.
//         case KeyType.Number: return Object.is(a, b)
//         case KeyType.KeyRange: return (b as IDBKeyRange).includes(a)
//         case KeyType.Array: return (b as DBValidKey[]).every(b => keyEq(a, b))
//         case KeyType.String: return false
//         case KeyType.Date: return false
//       }

//     case KeyType.Date:
//       switch (bType) {
//         case KeyType.Date: return (a as Date).getTime() === (b as Date).getTime() 
//         case KeyType.Array: return (b as DBValidKey[]).every(b => keyEq(a, b))
//         case KeyType.KeyRange: return (b as IDBKeyRange).includes(a)
//         case KeyType.String: return false
//         case KeyType.Number: return false
//       }

//     case KeyType.Array:
//       switch (bType) {
//         case KeyType.Date: return (a as DBValidKey[]).every(a => keyEq(a, b)) 
//         case KeyType.String: return (a as DBValidKey[]).every(a => keyEq(a, b))
//         case KeyType.Number: return (a as DBValidKey[]).every(a => keyEq(a, b))
//         case KeyType.KeyRange: return (a as DBValidKey[]).every(a => keyEq(a, b))
//         case KeyType.Array: 
//           if ((a as DBValidKey[]).length !== (b as DBValidKey[]).length) {
//             return false
//           }
//           for (let i = 0; i < b.length; i++) {
//             if (!keyEq(a[i], b[i])) {
//               return false
//             }
//           }
//           return true
//       }

//     case KeyType.KeyRange:
//       switch (bType) {
//         case KeyType.Date: return a.includes(b)
//         case KeyType.Number: return a.includes(b)
//         case KeyType.String: return a.includes(b)
//         case KeyType.KeyRange: return a.includes(b)
//         case KeyType.Array: return b.every(b => a.includes(b))
//       }
//   }
// }