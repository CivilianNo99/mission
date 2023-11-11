import { Persistent } from '/db/stores.ts'
import { Task } from '/db/tasks.ts'

export enum TaskVisibility {
  ShowAll,
  ShowDue,
  ShowPending,
  ShowComplete,
}

export class Store extends Persistent.Store<Task.Task> {
  
  addOne(item: Task.Task): Promise<Task.Task> {
    console.log('TASKS STORE. Add One: ', item)
    return super.addOne(item)
  }
  
  
  /** 
   * Specifies what tasks to view in the Tasks View.
  */
  itemVisibility: TaskVisibility = TaskVisibility.ShowComplete

  /** 
   * Returns an iterator over the visible tasks.
   * 
   * TODO(me): Allow specifing the order of iteration. For example:
   *   - Due Ascending
   *   - Due Descending
   *   - Alphabetically Ascending
   *   - Alphabetically Descending
   *   - Creation Time Ascending
   *   - Creation Time Descending
  */
  iterVisibleItems() {
    switch (this.itemVisibility) {
      case TaskVisibility.ShowAll: return this.iterAll()
      case TaskVisibility.ShowDue: return this.iterDue()
      case TaskVisibility.ShowPending: return this.iterPending()
      case TaskVisibility.ShowComplete: return this.iterComplete()
    }
  }
  /** 
   * Returns an iterator over all tasks.
  */
  private iterAll() {
    return this.items()
  }
  /** 
   * Returns an iterator over all tasks that are due now.
   */
  private * iterDue() {
    for (const item of this.items()) {
      if (item.isDue) {
        yield item
      }
    }
  }
  
  private * iterPending() {
    for (const item of this.items()) {
      if (item.isPending) {
        yield item
      }
    }
  }
  /**
   * Returns an iterator over all the complete tasks.
   */
  private * iterComplete() {
    for (const item of this.items()) {
      if (item.isComplete) {
        yield item
      }
    }
  }
}

export const TASKS_STORE = new Store()
