import type { Obj } from "../obj"

/**
 * Returns a copy of {@param array} that excludes all items whose
 * ids are equal to {@param id}.
 */
export function del<T extends Obj>(array: T[], id: string) {
  return array.filter(item => item.id !== id)
}

export function put<T extends Obj>(array: T[], toPut: T) {  
  const copy: T[] = []
  let put = false

  for (const item of array) {
    if (item.id !== toPut.id || put) {
      copy.push(item)
    } else {
      copy.push(toPut)
      put = true
    }
  }

  if (!put) {
    copy.push(toPut)
  }

  return copy
}
