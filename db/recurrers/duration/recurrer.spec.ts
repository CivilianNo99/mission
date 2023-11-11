import { Temporal } from 'npm:@js-temporal/polyfill'
import { IntervalRecurrer } from "./class.ts"


const recurrer = IntervalRecurrer.new(
  new Temporal.Duration(0, 0, 0, 0, 0, 0, 10)
)

await new Promise(resolve => {
  setTimeout(resolve, 1000 * 100);
})

recurrer.apply(Temporal.Now.instant(), (now) => {
  console.log("Now: ", now.toString())
})