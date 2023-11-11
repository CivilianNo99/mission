import { AddMutation, PutMutation, type Mutation, DeleteMutation, ClearMutation } from "./mutations";
import type { Query } from "./queries";

const queries: Query<any>[] = []

export function stale(query: Query<any>) {
  const idx = queries.findIndex(item => item === query)
  if (idx !== -1) {
    queries.splice(idx, 1)
  }
}
export function track(query: Query<any>) {
  queries.push(query)
} 
export async function dispatch(mutation: Mutation) {
  if (mutation instanceof AddMutation) {
    for (const query of queries) {
      await query.onAdd(mutation)
    }
  } else if (mutation instanceof PutMutation) {
    for (const query of queries) {
      await query.onPut(mutation)
    }
  } else if (mutation instanceof DeleteMutation) {
    for (const query of queries) {
      await query.onDelete(mutation)
    }
  } else if (mutation instanceof ClearMutation) {
    for (const query of queries) {
      await query.onClear(mutation)
    }
  } else {
    throw new TypeError("invalid mutation")
  }
}