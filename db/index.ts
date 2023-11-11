/// <reference lib="dom" />

import { Dexie, type Table } from "dexie"

export interface Task {
  id?: number
  isComplete: boolean
  description: string
}

class Db extends Dexie {
  tasks!: Table<Task>

  constructor() {
    super("mission-dev")
    this.version(1).stores({
      tasks: "id++, description, isComplete"
    })
  }
}

export const db = new Db()
export const TASKS = db.tasks