import type { MaybePromise } from "/utility/ulib.ts"
import type * as Recurrer from '../Recurrer'

export type Apply = () => MaybePromise<unknown>

export interface NewArg extends Recurrer.NewArg {}
export interface JsonRepr extends Recurrer.JsonRepr {}