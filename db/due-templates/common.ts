import { Temporal } from 'npm:@js-temporal/polyfill'
import { DueTemplate, DueAfterDurationTemplate } from '../due-templates.ts'

export enum Kind {
  DueAfterDurationTemplate
}

function isDueAfterDurationTemplateJsonRepr(jsonRepr: DueTemplate.JsonRepr): jsonRepr is DueAfterDurationTemplate.JsonRepr {
  return jsonRepr.kind === Kind.DueAfterDurationTemplate
}

export function initialize(jsonRepr: DueTemplate.JsonRepr) {
  if (isDueAfterDurationTemplateJsonRepr(jsonRepr)) {
    return new DueAfterDurationTemplate.DueAfterDurationTemplate({
      duration: Temporal.Duration.from(jsonRepr.duration)
    })
  }

  throw new TypeError("Invalid argument")
}