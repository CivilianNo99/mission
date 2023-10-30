import { Persistent } from '/db/stores.ts'
import { Task } from '/db/tasks.ts'

export class Store extends Persistent.Store<Task.Task> {
  addOne(item: Task.Task): Promise<Task.Task> {
    console.log('TASKS STORE. Add One: ', item)
    return super.addOne(item)
  }
}

export const TASKS_STORE = new Store()