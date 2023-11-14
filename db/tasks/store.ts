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

// TODO: Allow sorting tasks:
//   - Aplhabetically ascending
//   - Aplhabetically descending
//   - By creation date ascending
//   - By creation date descending
//   - By due date ascending
//   - By due date descending
//   - By expiary date ascending
//   - By expiary date descending
export const tasks = new Store(
  "tasks",
  database,
  (jsonRepr: JsonRepr) => initialize(jsonRepr)
)