import { Temporal } from 'npm:@js-temporal/polyfill'
import type { msec } from './ulib.ts'

export function Now(): msec {
  return Date.now()
}
export function timeHasCome(time: Temporal.Instant) {
  return Temporal.Now.instant().epochSeconds > time.epochSeconds 
}