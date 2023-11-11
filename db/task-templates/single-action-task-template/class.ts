import { Id } from "/db/id.ts"
import { Kind } from "../common.ts"
import { Temporal } from "npm:@js-temporal/polyfill"
import { TASKS_STORE } from "/db/tasks/store.ts"
import { TaskTemplate } from "../task-template.ts"
import { SomeActionOneTime } from "../../tasks/some-action-one-time.ts"
import { NewArg } from "./typings.ts"

export class SomeActionOneTimeTaskTemplate extends TaskTemplate {
  get kind() {
    return Kind.SingleActionTaskTemplate
  }

  create(now: Temporal.Instant) {
    const timeDue = this.timeDue === null
      ? null
      : this.timeDue instanceof Temporal.Instant 
        ? this.timeDue
        : now.add(this.timeDue)

    const timeStale = this.timeStale === null
      ? null
      : this.timeStale instanceof Temporal.Instant
        ? this.timeStale
        : now.add(this.timeStale)

    const task = SomeActionOneTime.new({
      now,
      timeDue,
      timeStale,
      description: this.description,
    })

    return TASKS_STORE.addOne(task)
  }
  
  static new(arg: NewArg) {
    return new SomeActionOneTimeTaskTemplate({
      id: arg.id || Id(),
      timeDue: arg.timeDue,
      timeStale: arg.timeStale,
      description: arg.description,
      timeCreated: Temporal.Now.instant(),
    })
  }
}