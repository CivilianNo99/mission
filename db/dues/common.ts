import { Temporal } from 'npm:@js-temporal/polyfill'
import { AfterDuration, Never, Due } from '../dues.ts'

export enum Kind {
  NeverDue,
  DueAfterDuration,
}

function isNeverDueJsonRepr(jsonRepr: Due.JsonRepr): jsonRepr is Never.JsonRepr {
  return jsonRepr.kind === Kind.NeverDue
}

function isDueAfterDurationJsonRepr(jsonRepr: Due.JsonRepr): jsonRepr is AfterDuration.JsonRepr {
  return jsonRepr.kind === Kind.DueAfterDuration
}

export function initiailze(jsonRepr: Due.JsonRepr) {
  if (isDueAfterDurationJsonRepr(jsonRepr)) {
    return new AfterDuration.DueAfterDuration({
      due: Temporal.Instant.from(jsonRepr.due)
    })
  }

  if (isNeverDueJsonRepr(jsonRepr)) {
    return new Never.NeverDue()
  }
  
  throw new TypeError('Invalid argument')
}