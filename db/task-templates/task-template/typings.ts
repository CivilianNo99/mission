import { Id } from "/db/id.ts"
import { Kind } from "../common.ts"
import { Temporal } from 'npm:@js-temporal/polyfill'

export interface Crg {
  id: Id
  timeDue?: Temporal.Duration | Temporal.Instant | null
  timeStale?: Temporal.Duration | Temporal.Instant | null
  description: string
  timeCreated: Temporal.Instant
}
export interface NewArg {
  id?: Id
  timeDue?: Temporal.Duration | Temporal.Instant | null
  timeStale?: Temporal.Duration | Temporal.Instant | null
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