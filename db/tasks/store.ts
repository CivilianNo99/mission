import { Persistent } from '/db/stores.ts'
import { Task } from '/db/tasks.ts'

export class Store extends Persistent.Store<Task.Task> {}
export const store = new Store()