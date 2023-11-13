import { Database } from "/utility/indexed-db";
import type { DatabaseUpgrader } from "/utility/indexed-db/upgraders/database-upgrader";

class MyDatabase extends Database {
  onUpgrade(upgrader: DatabaseUpgrader): void {
    upgrader.createStore("tasks", { keyPath: "id" })
    upgrader.createStore("habits", { keyPath: "id" })
  }
}

export const database = new MyDatabase("mission-app-database", 1)
await database.open()