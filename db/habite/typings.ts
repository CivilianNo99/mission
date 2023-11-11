import { Id } from '/db/id.ts'
import * as Recurrer from '/db/recurrers/recurrer.ts'
import * as TaskTemplate from '/db/task-templates/task-template.ts'

export interface Crg {
  id: Id
  recurrer: Recurrer.Recurrer
  taskTemplate: TaskTemplate.TaskTemplate
}
export interface NewArg {
  id?: Id
  recurrer: Recurrer.Recurrer
  taskTemplate: TaskTemplate.TaskTemplate
}
export interface JsonRepr {
  id: Id
  recurrer: Recurrer.JsonRepr
  taskTemplate: TaskTemplate.JsonRepr
}