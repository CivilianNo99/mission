import { Store } from '/utility/indexed-db-hook'
import { database } from '../database'
import { initialize } from './common'
import type { JsonRepr } from './Task'

export enum TaskVisibility {
  ShowAll,
  ShowDue,
  ShowPending,
  ShowComplete,
}

export const tasks = new Store(
  "tasks",
  database,
  (jsonRepr: JsonRepr) => initialize(jsonRepr)
)