import { ScoringCondition } from "../ScoringCondition/class.ts";

export class ProgressBar extends ScoringCondition {
  boxScore = 1
  boxesNumber = 0
  checkedBoxesNumber = 0

  get score() {
    return this.boxScore * this.checkedBoxesNumber
  }

  do() {
    if (this.checkedBoxesNumber < this.boxesNumber) {
      this.checkedBoxesNumber++
    }
  }
  
  undo() {
    if (this.checkedBoxesNumber > 0) {
      this.checkedBoxesNumber--
    }
  }
}