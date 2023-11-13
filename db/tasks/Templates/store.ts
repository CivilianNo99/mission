import type { JsonRepr } from "./Task"
import { initialize } from "./common"
import { database } from "/db/database"
import { Store } from "/utility/indexed-db"

// export const taskTemplates = new Store(
//   "task-templates",
//   database,
//   (json: JsonRepr) => initialize(json)
// )