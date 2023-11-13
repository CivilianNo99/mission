import { tasks } from "./store"

// /** 
  //  * Specifies what tasks to view in the Tasks View.
  // */
  // itemVisibility: TaskVisibility = TaskVisibility.ShowComplete

  // /** 
  //  * Returns an iterator over the visible tasks.
  //  * 
  //  * TODO(me): Allow specifing the order of iteration. For example:
  //  *   - Due Ascending
  //  *   - Due Descending
  //  *   - Alphabetically Ascending
  //  *   - Alphabetically Descending
  //  *   - Creation Time Ascending
  //  *   - Creation Time Descending
  // */
  // iterVisibleItems() {
  //   switch (this.itemVisibility) {
  //     case TaskVisibility.ShowAll: return this.iterAll()
  //     case TaskVisibility.ShowDue: return this.iterDue()
  //     case TaskVisibility.ShowPending: return this.iterPending()
  //     case TaskVisibility.ShowComplete: return this.iterComplete()
  //   }
  // }
/** 
 * Returns an iterator over all tasks.
*/
export function iterAll() {
  return tasks.all()
}

/** 
 * Returns an iterator over all tasks that are due now.
 */
export async function * iterDue() {
  for await (const item of tasks.iter()) {
    if (item.isDue) {
      yield item
    }
  }
}

export async function * iterPending() {
  for await (const item of tasks.iter()) {
    if (item.isPending) {
      yield item
    }
  }
}
/**
 * Returns an iterator over all the complete tasks.
 */
export async function * iterComplete() {
  for await (const item of tasks.iter()) {
    if (item.isComplete) {
      yield item
    }
  }
}