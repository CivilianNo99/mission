import * as Recurrer from '../recurrer.ts'

export interface Crg extends Recurrer.Crg {
  lastDay: number
  recurrer: Recurrer.Recurrer
}
export interface NewArg extends Recurrer.NewArg {
  recurrer: Recurrer.Recurrer
}
export interface JsonRepr extends Recurrer.JsonRepr {
  lastDay: number
  recurrer: Recurrer.JsonRepr
}