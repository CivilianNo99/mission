import * as SingleActionTaskTemplate from './single-action-task-template.ts'
import * as TaskTemplate from './task-template.ts'

export enum Kind {
  SingleActionTaskTemplate,
}

function isSingleActionTaskTemplateJsonRepr(jsonRepr: TaskTemplate.JsonRepr): jsonRepr is SingleActionTaskTemplate.JsonRepr {
  return jsonRepr.kind === Kind.SingleActionTaskTemplate
}

export function initialize(jsonRepr: TaskTemplate.JsonRepr) {
  if (isSingleActionTaskTemplateJsonRepr(jsonRepr)) {
    return new SingleActionTaskTemplate.SingleActionTaskTemplate(jsonRepr)
  }

  throw new TypeError('Invalid argument')
}