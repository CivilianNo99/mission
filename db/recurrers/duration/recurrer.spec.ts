import { Temporal } from 'npm:@js-temporal/polyfill'
import { DurationRecurrer } from "./class.ts"


const recurrer = DurationRecurrer.new({
  now:  Temporal.Now.instant(),
  duration: new Temporal.Duration(0, 0, 0, 0, 0, 1)
})

function apply() {
  console.log("apply().")
  recurrer.apply(Temporal.Now.instant(), (now) => {
    console.log("recurrer.apply().")
  })
}

setInterval(apply, 1000 * 5)
