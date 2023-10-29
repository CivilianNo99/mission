import { msec } from './ulib.ts'

export function Now(): msec {
  return Date.now()
}