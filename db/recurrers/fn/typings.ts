import { MaybePromise } from "/utility/ulib.ts"
import * as Recurrer from '../recurrer.ts'

export type Apply = () => MaybePromise<unknown>

export interface JsonRepr extends Recurrer.JsonRepr {}