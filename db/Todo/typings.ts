import { Und } from '../../utility/ulib.ts'
import * as Obj from '../Obj.ts'

export interface Crg extends Obj.Crg {
  name: string
  description: string
}
export interface JsonRepr extends Obj.JsonRepr {
  name: string
  description: string
  
}
export interface CreateArg extends Obj.CreateArg {
  name: string
  description?: Und<string>
}
export type Rop = Obj.Rop
  | [opcode: 'name']
  | [opcode: 'description']
export type Wop = Obj.Wop
  | [opcode: 'name', name: string]
  | [opcode: 'description', description: string]