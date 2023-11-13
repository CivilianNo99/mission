import type { MaybePromise } from "utility/ulib";
import type { Obj } from "../obj";
import type { Store } from "../store";
import { type Mutation, createPutMutation, createAddMutation, createClearMutation, createDeleteMutation } from "./mutations";
import { createGetAllQuery, createGetManyQuery, createGetOneQuery, type Query } from "./queries";

const queries: Query<any>[] = []

function eq(mutation: Mutation, query: Query<any>) {
  return (
    mutation.database === query.database
    &&
    mutation.store === query.store
  )
}

export async function dispatchPut<T extends Obj>(store: Store<T>, item: T) {
  const mutation = createPutMutation(store, item)
  for (const query of queries) {
    if (eq(mutation, query)) {
      await query.onPut(mutation)
    }
  }
}
export async function dispatchAdd<T extends Obj>(store: Store<T>, item: T) {
  const mutation = createAddMutation(store, item)
  for (const query of queries) {
    if (eq(mutation, query)) {
      await query.onAdd(mutation)
    }
  }
}
export async function dispatchClear(store: Store<any>) {
  const mutation = createClearMutation(store)
  for (const query of queries) {
    if (eq(mutation, query)) {
      await query.onClear(mutation)
    }
  }
}
export async function dispatchDelete(store: Store<any>, itemId: string) {
  const mutation = createDeleteMutation(store, itemId)
  for (const query of queries) {
    if (eq(mutation, query)) {
      await query.onDelete(mutation)
    }
  }
}

/**
 * Makes the query able to track database mutations.
 */
export function track(query: Query<any>) {
  queries.push(query)
}
/** 
 * Makes the query unable to track database mutations.
*/
export function untrack(query: Query<any>) {
  const idx = queries.findIndex(item => item === query)
  if (idx !== -1) {
    queries.splice(idx, 1)
  }
}

interface Cb<T> {
  (): MaybePromise<T>
}

export function queryOne<T extends Obj>(
  store: Store<T>, 
  itemId: string, 
  cb: Cb<T | null>,
) {
  const query = createGetOneQuery(store, itemId)
  track(query)
  
  ;(async () => {
    try {
      query.update(await cb())
    } catch (error) {
      // TODO(me): Handle the error more gracfully.
      console.error(error)
    }
  })();

  return query
}
export function queryMany<T extends Obj>(store: Store<T>, itemIds: string[], cb: Cb<T[]>) {
  const query = createGetManyQuery(store, itemIds)
  track(query)
  
  ;(async () => {
    try {
      query.update(await cb())
    } catch (error) {
      // TODO(me): Handle the error more gracfully.
      console.error(error)
    }
  })();

  return query
}
export function queryAll<T extends Obj>(store: Store<T>, cb: Cb<T[]>) {
  const query = createGetAllQuery(store)
  track(query)
  
  ;(async () => {
    try {
      query.update(await cb())
    } catch (error) {
      // TODO(me): Handle the error more gracfully.
      console.error(error)
    }
  })();

  return query
}
// findOne(store, callback)
// findMany(store, callback)
