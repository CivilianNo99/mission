import * as Recurrer from "../recurrer.ts"

export interface Crg extends Recurrer.Crg {
  times: number
  recurrer: Recurrer.Recurrer
}
export interface NewArg extends Recurrer.NewArg {
  times: number
  recurrer: Recurrer.Recurrer
}
export interface JsonRepr extends Recurrer.JsonRepr {
  times: number
  recurrer: Recurrer.JsonRepr
}