import { Kind } from "../common.ts"
import { Temporal } from "npm:@js-temporal/polyfill"
import { DueTemplate } from "../due-template.ts"
import { Crg, JsonRepr } from "./typings.ts"
import { DueAfterDuration } from "/db/dues/after-milliseconds.ts"

export class DueAfterDurationTemplate extends DueTemplate {
  duration: Temporal.Duration

  constructor(arg: Crg) {
    super()
    this.duration = arg.duration
  }

  get kind(): Kind {
    return Kind.DueAfterDurationTemplate
  }

  create() {
    return DueAfterDuration.new(this.duration)
  }
  
  jsonify(): JsonRepr {
    return {
      ...super.jsonify(),
      duration: this.duration.toString(),
    }
  }

  static new(duration: Temporal.Duration) {
    return new DueAfterDurationTemplate({ duration })
  }
}