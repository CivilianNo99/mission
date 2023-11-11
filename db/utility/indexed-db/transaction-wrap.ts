
export class TransactionWrap {
  constructor(private readonly transaction: IDBTransaction) {}

  get db() {
    return this.transaction.db
  }
  
  get mode() {
    return this.transaction.mode
  }
  
  get durability() {
    return this.transaction.durability
  }

  store<Item>(name: string) {
    return this.transaction.objectStore(name)
    // return new StoreWrap<Item>(this.transaction.objectStore(name))
  }

  cancel() {
    this.transaction.abort()
  }
}