import * as PersistentStore from '/db/stores/persistent.ts'
import * as Habit from 'db/habite'
import { Dexie, type Table } from "npm:dexie"

crypto.randomUUID()

interface Task {
  id: string
  isComplete: boolean
  description: string
}

class MyDb extends Dexie {
  tasks!: Table<Task>

  constructor() {
    super("mission-dev")
    this.version(1).stores({
      tasks: "id"
    })
  }
}

const db = new MyDb()
db.tasks.
export class Store extends PersistentStore.Store<Habit.Habit> {}

export const HABITS_STORE = new Store()
