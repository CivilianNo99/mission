import { Habit } from './habit.ts'
import { Temporal } from 'npm:@js-temporal/polyfill'
import { HABITS_STORE } from './store.ts'
import { DurationRecurrer } from '/db/recurrers/interval.ts'
import { SomeActionOneTimeTaskTemplate } from '/db/task-templates.ts'

let now = new Temporal.PlainDateTime(2023, 10, 7)
  .toZonedDateTime("UTC")
  .toInstant()

const habit = Habit.new({
  // Repeat this task every five seconds
  recurrer: DurationRecurrer.new({
    now,
    duration: Temporal.Duration.from({
      hours: 1
    })
  }),

  taskTemplate: SomeActionOneTimeTaskTemplate.new({
    timeDue: new Temporal.Duration(0, 0, 0, 0, 0, 3),
    timeStale: new Temporal.Duration(0, 0, 0, 0, 0, 3),
    description: 'Wash your teeth',
  })
})

HABITS_STORE.addOne(habit)

setInterval(() => {
  now = now.add(new Temporal.Duration(0, 0, 0, 0, 3))
  habit.recur(now)
  
}, 1000 * 5);
// new Promise(resolve => {

// })
// habit.recur(now)
// habit.recur(now)
// habit.recur(now)
// habit.recur(now)
// habit.recur(now)
// habit.recur(now)
// habit.recur(now)
// habit.recur(now)
// habit.recur(now)
// habit.recur(now)
// habit.recur(now)
// habit.recur(now)
// habit.recur(now)
// habit.recur(now)
// habit.recur(now)
// habit.recur(now)
// habit.recur(now)
// habit.recur(now)
// habit.recur(now)
// habit.recur(now)
// habit.recur(now)
// habit.recur(now)
// habit.recur(now)
// habit.recur(now)
// habit.recur(now)
// habit.recur(now)
// habit.recur(now)
// habit.recur(now)
// habit.recur(now)
// habit.recur(now)