import { Kind } from "../kind.ts"
import { tasks } from "/db/tasks/store.ts"
import { Temporal } from "npm:@js-temporal/polyfill"
import { TaskTemplate } from "../Task"
import { SomeActionOneTime } from "/db/tasks/SomeActionOneTime"
import type { NewArg } from "./typings.ts"
import { Id } from "/db"


export class SomeActionOneTimeTaskTemplate extends TaskTemplate {
  get kind() {
    return Kind.SingleActionTaskTemplate
  }

  create(now: Temporal.Instant) {
    const timeDue = this.timeDue === null
      ? null
      : now.add(this.timeDue)

    const timeStale = this.timeStale === null
      ? null
      : (timeDue ?? now).add(this.timeStale)

    const task = SomeActionOneTime.new({
      now,
      timeDue,
      timeStale,
      description: this.description,
    })

    return tasks.add(task)
  }
  
  static new(arg: NewArg) {
    return new SomeActionOneTimeTaskTemplate({
      id: arg.id || Id(),
      timeDue: arg.timeDue ?? null,
      timeStale: arg.timeStale ?? null,
      description: arg.description,
      timeCreated: Temporal.Now.instant(),
    })
  }
}