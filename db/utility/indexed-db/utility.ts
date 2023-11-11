import { DatabaseUpgrader } from "./database-upgrader"

export function purePutOrPushItemOnce<Item>(
  array: Item[], 
  toPut: Item,
  predicate: (item: Item) => boolean,
) {  
  const copy: Item[] = []
  let put = false

  for (const item of array) {
    if (!put && predicate(item)) {
      copy.push(toPut)
      put = true
    } else {
      copy.push(item)
    }
  }

  if (!put) {
    copy.push(toPut)
  }

  return copy
}

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