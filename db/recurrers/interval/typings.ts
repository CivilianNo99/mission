import * as Recurrer from '../recurrer.ts'

export interface Crg extends Recurrer.Crg {
  interval: number
  recurrer: Recurrer.Recurrer
  prevApply: number
}
export interface JsonRepr extends Recurrer.JsonRepr {
  interval: number
  recurrer: Recurrer.JsonRepr
  prevApply: number
}