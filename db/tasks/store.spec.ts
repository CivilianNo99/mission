import { Id } from '/db/id.ts'
import { TASKS_STORE } from './store.ts';
import { SomeAtionOneTime } from './index.ts'
import { DueAfterDuration } from '../dues/after-duration.ts'
import { Temporal } from 'npm:@js-temporal/polyfill'


TASKS_STORE.addOne(SomeAtionOneTime.SomeActionOneTime.new({
  // Due in three days
  due: DueAfterDuration.new(new Temporal.Duration(0, 0, 3)),
  description: "Squash that cat",
}))
TASKS_STORE.addOne(SomeAtionOneTime.SomeActionOneTime.new({
  // Due in three days
  due: DueAfterDuration.new(new Temporal.Duration(0, 0, 3)),
  description: "Squash that cat",
}))