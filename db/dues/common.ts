import { Crg } from './due.ts'
import { atMillisecond, afterMilliseconds, never } from '../due-dates.ts'

export enum Kind {
  Never,
  AtMillisecond,
  AfterMilliseconds,
}

export function initAny(kind: Kind, arg: Crg) {
  switch (kind) {
    case Kind.Never: return new never.NeverDue()
    case Kind.AtMillisecond: return new atMillisecond.DueAtMillisecond(arg as any)
    case Kind.AfterMilliseconds: return new afterMilliseconds.DueAfterMilliseconds(arg as any)
  }
}
export function createAny(kind: Kind, arg: Crg) {
  switch (kind) {
    case Kind.Never: return new never.NeverDue()
    case Kind.AtMillisecond: return new atMillisecond.DueAtMillisecond(arg as any)
    case Kind.AfterMilliseconds: return new afterMilliseconds.DueAfterMilliseconds(arg as any)
  }
}