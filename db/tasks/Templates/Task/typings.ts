import type { Id } from "/db/id.ts"
import type { Kind } from "../common.ts"
import type { Temporal } from 'npm:@js-temporal/polyfill'

export interface Crg {
  id: Id
  title: string
  timeDue: Temporal.Duration | null
  timeStale: Temporal.Duration | null
  description: string
  timeCreated: Temporal.Instant
}
export interface NewArg {
  now?: Temporal.Instant
  title: string
  id?: Id
  timeDue?: Temporal.Duration | null
  timeStale?: Temporal.Duration | null
  description: string
}
export interface JsonRepr {
  id: Id
  title: string
  kind: Kind
  timeDue: string | null
  timeStale: string | null
  description: string
  timeCreated: string
}