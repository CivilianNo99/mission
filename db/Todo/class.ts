import { CreateArg, Crg, JsonRepr, Rop, Wop } from './typings.ts'
import { Obj } from '../Obj.ts'
import { Null } from '../../utility/ulib.ts';
import { ScoringConditions } from '../ScoringConditions/class.ts';


class Todo_1 {
  name: string
  done: boolean
  dateDone: Null<number>
  dateCreated: number
  description: string
  scoringConditions: ScoringConditions

  constructor() {
    this.name = 'Cut your nails'
    this.done = false
    this.dateDone = null
    this.description = 'Cut your nails'
    this.dateCreated = 0
    this.scoringConditions = new ScoringConditions()
  }

  do() {
    this.done = true
  }

  undo() {
    this.done = false
  }

  get score() {
    return this.scoringConditions.score
  }
}


class Todo_2 extends Todo_1 {
  dateDue: number
  dateActive: number

  constructor() {
    super()
    this.dateDue = new Date('2024-01-01').getTime()
    this.dateActive = new Date('2024-01-02').getTime()
  }

  get isDue() {
    return this.dateDue <= Date.now()
  }
  
  get isActive() {
    return this.dateActive <= Date.now()
  }
}



class Composer {
  todos: Todo_1[]

  constructor() {
    this.todos = [
      new Todo_1(),
      new Todo_1(),
      new Todo_1(),
    ]
  }

  get done() {
    return this.todos.every(todo => todo.done)
  }
  // get score() {
  //   let score = 0
  //   for (const todo of this.todos) {
  //     score += todo.
  //   }
  // }
}

export class Todo extends Obj {
  name: string
  isDone: boolean
  description: string

  constructor(crg: Crg) {
    super(crg)
    this.name = crg.name
    this.isDone = false
    this.description = crg.description
  }

  markDone() {
    this.isDone = true
  }

  markNotDone() {
    this.isDone = false
  }
}

class CompoundTodo {
  todos: Todo[] = []
}