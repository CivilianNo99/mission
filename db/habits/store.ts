import { Store } from "/utility/indexed-db-hook"
import { database } from "../database"
import { Habit, type JsonRepr } from "./Habite"
import { Temporal } from "@js-temporal/polyfill"

// TODO: All sorting habits:
//   - aplhabetically ascending
//   - aplhabetically descending
//   - by creationg time ascending
//   - by creationg time descending
//
export const habits = new Store(
  "habits", 
  database, 
  (arg: JsonRepr) => Habit.fromJson(arg),
)


// setInterval(async () => {
//   for await (const item of habits.iter()) {
//     // console.log(item.recurrer)
//     // await item.recur()
//   }
// }, 1000 * 5)
