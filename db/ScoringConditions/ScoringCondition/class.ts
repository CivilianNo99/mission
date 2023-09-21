import { Obj } from '../../Obj.ts'

export abstract class ScoringCondition extends Obj {
  abstract do(): any
  abstract undo(): any
}