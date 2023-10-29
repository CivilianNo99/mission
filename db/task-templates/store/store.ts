import { Persistent } from '/db/stores.ts'
import { TaskTemplate } from '../task-template.ts'

export class Store extends Persistent.Store<TaskTemplate> {}
export const store = new Store()