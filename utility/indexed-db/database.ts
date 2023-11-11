import { promisifyOpen } from "./utility"
import type { Obj } from "./obj"
import type { Null } from "utility/ulib"
import type { Store } from "./store"
import type { DatabaseUpgrader } from "./upgraders/database-upgrader"

export class Database {
  readonly name: string
  readonly version: number
  private maybeDatabase: Null<IDBDatabase>
  private readonly stores: Store<Obj>[]

  constructor(name: string, version: number) {
    this.name = name
    this.version = version
    this.maybeDatabase = null
    this.stores = []
  }

  /** 
   * Returns the native datatbase. Or thows if the database is not 
   * `this.open`ed yet.
  */
  private get database() {
    if (this.maybeDatabase) {
      return this.maybeDatabase
    } else {
      throw new Error("Database is not open. Open the database and try againt.")
    }
  }
  /** 
   * Opens this database if it is not. If the provided database version is higher
   * than the version on the disk, `this.onUpgrade` is called with a `DatabaseUpgrader`.
  */
  async open() {
    if (this.maybeDatabase) {
      return this.maybeDatabase
    }
    
    this.maybeDatabase = await promisifyOpen(
      this.name, 
      this.version, 
      upgrader => this.onUpgrade(upgrader)
    )
  }
  /** 
   * Closes this database if it is open.
  */
  close() {
    this.maybeDatabase?.close()
  }
  /** 
   * Creates and returns a readonly transaction over the provided stores.
  */
  query(stores: string | string[], options?: IDBTransactionOptions) {
    return this.database.transaction(stores, "readonly", options)
  }
  /** 
   * Creates and returns a readwrite transaction over the provided stores.
  */
  mutate(stores: string | string[], options?: IDBTransactionOptions) {
    return this.database.transaction(stores, "readwrite", options)
  }
  /** 
   * This function is called whenever the provided database version is higher
   * than the version on the disk.
   * 
   * This function must return synchronously, otherwise, it'll miss the transaction.
   * This this a standard IndexedDb thing. To know more about it, read the IndexedDB
   * documentation on MDN (Mozilla Developer Network).
  */
  onUpgrade(upgrader: DatabaseUpgrader) {
    // noop
  }

  private hasStore(name: string) {
    return this.stores.some(store => store.name === name)
  }
  private affirmStoreNameIsAvailable(name: string) {
    if (this.hasStore(name)) {
      throw new Error(`The database already has a store named "${name}".`)
    }
  }
  registerStore(store: Store<Obj>) {
    this.affirmStoreNameIsAvailable(store.name)
    this.stores.push(store)
  }
}