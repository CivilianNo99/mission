import { Now } from '/utility/time.ts'
import { Habit } from './habit.ts'
import { store as HABITS_STORE } from './store.ts'
import { TASKS_STORE as TASKS_STORE } from '/db/tasks/store.ts'
import * as Recurrers from '/db/recurrers.ts'
import * as TaskTemplates from '/db/task-templates.ts'
import * as DueTemplates from '/db/due-templates.ts'

const habit = new Habit({
  id: '90',
  
  recurrer: <Recurrers.Interval.JsonRepr> {
    kind: Recurrers.Kind.Interval,
    /** five seconds */
    interval: 1000 * 5,
    prevApply: Now(),
    recurrer: <Recurrers.Fn.JsonRepr> {
      kind: Recurrers.Kind.Fn
    }
  },

  taskTemplate: <TaskTemplates.SingleActionTask.JsonRepr> {
    id: '78',
    kind: TaskTemplates.Kind.SingleActionTaskTemplate,
    description: 'Wash your teeth',
    creationInstant: Now(),
    due: <DueTemplates.DueAfterDurationTemplate.JsonRepr> {
      kind: DueTemplates.Kind.DueAfterDurationTemplate,
      /** Five minutes */
      dueAfter: 1000 * 60 * 5,
    }
  }
})

HABITS_STORE.addOne(habit)

// Hack to keep the process from exiting
setInterval(() => {
  habit.recurrer.apply()
}, 1000 * 5);