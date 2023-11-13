import { Temporal } from 'npm:@js-temporal/polyfill'
import * as TaskTemplate from './Task'
import * as SomeActionOneTime from './SomeActionOneTime'
import { Kind } from './kind'
export { Kind }

function isSingleActionTaskTemplateJsonRepr(jsonRepr: TaskTemplate.JsonRepr)
  : jsonRepr is SomeActionOneTime.JsonRepr 
{
  return jsonRepr.kind === Kind.SingleActionTaskTemplate
}

export function initialize(jsonRepr: TaskTemplate.JsonRepr) {
  if (isSingleActionTaskTemplateJsonRepr(jsonRepr)) {
    return new SomeActionOneTime.SomeActionOneTimeTaskTemplate({
      id: jsonRepr.id,
      timeDue: jsonRepr.timeDue ? Temporal.Duration.from(jsonRepr.timeDue) : null,
      timeStale: jsonRepr.timeStale ? Temporal.Duration.from(jsonRepr.timeStale) : null,
      description: jsonRepr.description,
      timeCreated: Temporal.Instant.from(jsonRepr.timeCreated),
    })
  }

  throw new TypeError('Invalid task template json repr.')
}