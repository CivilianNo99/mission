import { Temporal } from 'npm:@js-temporal/polyfill'
import * as DueTemplates from '/db/due-templates.ts'
import * as TaskTemplate from './task-template.ts'
import * as SingleActionTaskTemplate from './single-action-task-template.ts'

export enum Kind {
  SingleActionTaskTemplate,
}

function isSingleActionTaskTemplateJsonRepr(jsonRepr: TaskTemplate.JsonRepr): jsonRepr is SingleActionTaskTemplate.JsonRepr {
  return jsonRepr.kind === Kind.SingleActionTaskTemplate
}

export function initialize(jsonRepr: TaskTemplate.JsonRepr) {
  if (isSingleActionTaskTemplateJsonRepr(jsonRepr)) {
    return new SingleActionTaskTemplate.SomeActionOneTimeTaskTemplate({
      id: jsonRepr.id,
      description: jsonRepr.description,
      timeDue: DueTemplates.initialize(jsonRepr.timeDue),
      timeCreated: Temporal.Instant.from(jsonRepr.timeCreated),
    })
  }

  throw new TypeError('Invalid argument')
}