import { Obj } from '../../Obj/index.ts'

export abstract class ScoringCondition extends Obj {
  abstract do(): any
  abstract undo(): any
}