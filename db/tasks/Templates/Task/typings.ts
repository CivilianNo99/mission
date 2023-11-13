import type { Id } from "/db/id.ts"
import type { Kind } from "../common.ts"
import type { Temporal } from 'npm:@js-temporal/polyfill'

export interface Crg {
  id: Id
  timeDue: Temporal.Duration | null
  timeStale: Temporal.Duration | null
  description: string
  timeCreated: Temporal.Instant
}
export interface NewArg {
  now?: Temporal.Instant
  id?: Id
  timeDue?: Temporal.Duration | null
  timeStale?: Temporal.Duration | null
  description: string
}
export interface JsonRepr {
  id: Id
  kind: Kind
  timeDue: string | null
  timeStale: string | null
  description: string
  timeCreated: string
}