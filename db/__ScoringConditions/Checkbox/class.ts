import { ScoringCondition } from '../ScoringCondition/class.ts';

export class Checkbox extends ScoringCondition {
  description: string
  isChecked: boolean
  score: number

  constructor() {
    super({ id: '' })
    this.description = ''
    this.isChecked = false
    this.score = 0
  }

  check() {
    this.isChecked = true
  }
  
  uncheck() {
    this.isChecked = false
  }
}