import { MaybePromise } from "/utility/ulib.ts"
import * as Recurrer from '../recurrer.ts'

export type Apply = () => MaybePromise<unknown>

export interface NewArg extends Recurrer.NewArg {}
export interface JsonRepr extends Recurrer.JsonRepr {}