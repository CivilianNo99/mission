import { Id } from '/db/id.ts'
import * as Recurrer from '/db/recurrers/recurrer'
import * as TaskTemplate from '/db/tasks/Templates/Task'

export interface Crg {
  id: Id
  recurrer: Recurrer.Recurrer
  task: TaskTemplate.TaskTemplate
  description: string
}
export interface NewArg {
  id?: Id
  recurrer: Recurrer.Recurrer
  description: string
  task: TaskTemplate.TaskTemplate
}
export interface JsonRepr {
  id: Id
  recurrer: Recurrer.JsonRepr
  description: string
  task: TaskTemplate.JsonRepr
}