export class StoreUpgrader {
  constructor(private readonly store: IDBObjectStore) {}

  createIndex(
    name: string, 
    keyPath: string | Iterable<string>, 
    options?: IDBIndexParameters | undefined,
  ) {
    this.store.createIndex(name, keyPath, options)
  }

  deleteIndex(name: string) {
    this.store.deleteIndex(name)
  }
}