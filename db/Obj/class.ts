import { id } from '../utility/id.ts'
import { Crg, JsonRepr, Rop, Wop } from './typings.ts'

export class Obj {
  readonly id: id

  constructor(crg: Crg) {
    this.id = crg.id
  }

  runRop(op: Rop): unknown {
    switch (op[0]) {
      case 'id': return this.id
    }

    throw new Error(`Unknown opcode: ${op[0]}`)
  }

  runWop(op: Wop): unknown {
    throw new Error(`Unknown opcode: ${op[0]}`)
  }

  jsonify(): JsonRepr {
    return {
      id: this.id,
    }
  }

  destroy(): any {
    // noop
  }
}