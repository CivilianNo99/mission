import * as PersistentStore from '/db/stores/persistent.ts'
import * as Habit from './habit.ts'

export class Store extends PersistentStore.Store<Habit.Habit> {}
export const store = new Store()
