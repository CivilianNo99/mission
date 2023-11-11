import { StoreUpgrader } from "./store-upgrader"

export class DatabaseUpgrader {
  constructor(private readonly db: IDBDatabase) {}

  createStore(name: string, options?: IDBObjectStoreParameters) {
    return new StoreUpgrader(this.db.createObjectStore(name, options))
  }

  deleteStore(name: string) {
    this.db.deleteObjectStore(name)
  }
}