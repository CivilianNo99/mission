import { DatabaseUpgrader } from "./upgraders/database-upgrader"


export function promisify<T>(request: IDBRequest<T>) {
  return new Promise<T>((resolve, reject) => {
    request.onerror = () => {
      reject(request.error)
    }
    request.onsuccess = () => {
      resolve(request.result)
    }
  })
}
export function promisifyOpen(
  name: string, 
  version: number,
  onUpgrade: (db: DatabaseUpgrader) => unknown,
) {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(name, version)

    request.onerror = () => {
      reject(request.error)
    }
    request.onblocked = () => {
      reject(request.error)
    }
    request.onsuccess = () => {
      resolve(request.result)
    }
    request.onupgradeneeded = () => {
      onUpgrade(new DatabaseUpgrader(request.result))
    }
  })
}

/** 
 * For simplicity, we currently only support string keys.
 * 
 * A key of a different type is an error. 
*/
export function affirmStringKey(value: unknown) {
  if (typeof value === "string") {
    return value
  }
  throw new TypeError("Invalid database key")
}


export class Awaiter<T> {
  throw!: (error: unknown) => void
  return!: (value: T) => void
  promise: Promise<T>

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.return = resolve
      this.throw = reject
    })
  }
}