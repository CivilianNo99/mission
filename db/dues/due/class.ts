import { Kind } from "../common.ts"
import { JsonRepr } from "./typings.ts"

export abstract class Due {
  abstract get kind(): Kind
  abstract get isDue(): boolean
  abstract isDueIn(thing: any): boolean
  abstract jsonify(): JsonRepr
}