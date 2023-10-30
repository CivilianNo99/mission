import { Temporal } from "npm:@js-temporal/polyfill"
import * as DueTemplate from '/db/due-templates/due-template.ts'
import * as TaskTemplate from '../task-template.ts'

export interface Crg extends TaskTemplate.Crg {
  dueTemplate: DueTemplate.DueTemplate
  description: string
  creationInstant: Temporal.Instant
}
export interface NewArg extends TaskTemplate.Crg {
  dueTemplate: DueTemplate.DueTemplate
  description: string
}
export interface JsonRepr extends TaskTemplate.JsonRepr {
  dueTemplate: DueTemplate.JsonRepr
  description: string
  creationInstant: string
}