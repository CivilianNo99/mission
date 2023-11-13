import { Id } from '/db/id.ts'
import { Kind } from '../common.ts'
import { Temporal } from 'npm:@js-temporal/polyfill'
import type { Null } from '/utility/ulib.ts'

export interface Crg {
  id: Id
  timeDue: Null<Temporal.Instant>
  timeStale: Null<Temporal.Instant>
  description: string
  timeCreated: Temporal.Instant
  timeCompleted: Null<Temporal.Instant>
}
export interface NewArg {
  now?: Temporal.Instant
  id?: Id
  timeDue?: Null<Temporal.Instant>
  timeStale?: Null<Temporal.Instant>
  description: string
}
export interface JsonRepr {
  id: Id
  kind: Kind
  timeDue: Null<string>
  timeStale: Null<string>
  description: string
  timeCreated: string
  timeCompleted: Null<string>
}