import { Crg, JsonRepr, NewArg } from './typings.ts'

export class FailueAndSuccessScore {
  successScore: number
  failureScore: number

  constructor(arg: Crg) {
    this.successScore = arg.successScore
    this.failureScore = arg.failureScore
  }

  calcuateFailueScore() {
    return this.failureScore
  }

  calcuateSuccessScore() {
    return this.successScore
  }

  jsonify(): JsonRepr {
    return {
      successScore: this.successScore,
      failureScore: this.failureScore,
    }
  }

  static new(arg: NewArg) {
    return new FailueAndSuccessScore(arg)
  }
}