import type { DatabaseUpgrader } from "./database-upgrader";
import { Database } from "./db";
import { Store } from "./store";

class MissionDatabase extends Database {
  constructor(version: number) {
    super("mission-dev", version)
  }

  onUpgrade(upgrader: DatabaseUpgrader): void {
    upgrader.createStore("tasks", { keyPath: "id" })
  }
}

const db = new MissionDatabase(1)
await db.open()

export const tasks = new Store({ 
  database: db,
  name: "tasks",
  keyPath: ["id"],
  autoIncrement: false
})


interface TaskCrg {
  id: string
  isComplete: boolean
  description: string
} 
interface TaskNewArg {
  isComplete?: boolean
  description: string
} 

export class Task {
  readonly id
  isComplete
  description

  constructor(arg: TaskCrg) {
    this.id = arg.id
    this.isComplete = arg.isComplete
    this.description = arg.description
  }

  static new(arg: TaskNewArg) {
    return new Task({
      id: crypto.randomUUID(),
      isComplete: arg.isComplete ?? false,
      description: arg.description,
    })
  }
}