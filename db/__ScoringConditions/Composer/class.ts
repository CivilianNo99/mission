import { id } from '../../utility/id.ts'
import { Null } from '../../../utility/ulib.ts'
import { ScoringCondition } from '../ScoringCondition/class.ts'

enum CheckType {
  Single,
  Multiple,
} 

class Composer {
  checkType: CheckType
  conditions: ScoringCondition[]
  description: Null<string>

  constructor() {
    this.conditions = []
    this.checkType = CheckType.Single
    this.description = null
  }

  check(id: string) {
    return this.checkType === CheckType.Single
      ? this.check_checkTypeSingle(id)
      : this.check_checkTypeMultiple(id)
  }

  private check_checkTypeSingle(id: id) {
    for (const condition of this.conditions) {
      if (condition.id === id) {
        condition.do() 
      } else {
        condition.undo()
      }
    }
  }

  private check_checkTypeMultiple(id: id) {
    for (const condition of this.conditions) {
      if (condition.id === id) {
        condition.do() 
      }
    }
  }
  
  uncheck(id: string) {
    for (const condition of this.conditions) {
      if (condition.id === id) {
        condition.undo()
      }
    }
  }

  get score() {
    let score = 0
    for (const condition of this.conditions) {
      if (condition.isChecked) {
        score += condition.score
      }
    }
    return score
  }
}

export { Composer }