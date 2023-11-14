import { Temporal } from "@js-temporal/polyfill";
import { $state, React, $ } from "/utility/react"
import css from "./style.module.css"
import { Reactor } from "/utility/ui-state/reactor";
import { DropdownButton, DropdownItem } from "react-bootstrap";


// enum Type {
//   Duration,
//   Date,
// }
// enum DurationType {
//   FiveMinutes,
//   ThirtyMinutes,
//   OneHour,
//   FiveHours,
//   TewlveHours,
//   OneDay,
//   OneWeek,
//   Custom,
// }
// enum DurationUnit {
//   Minutes,
//   Hours,
//   Days,
//   Weeks,
//   Months,
//   Years,
// }

const FIVE_MINUTES_DURATION = new Temporal.Duration(0, 0, 0, 0, 0, 5)
const THIRTY_MINUTES_DURATION = new Temporal.Duration(0, 0, 0, 0, 0, 30)
const ONE_HOUR_DURATION = new Temporal.Duration(0, 0, 0, 0, 1)
const FIVE_HOURS_DURATION = new Temporal.Duration(0, 0, 0, 0, 5)
const TWELVE_HOURS_DURATION = new Temporal.Duration(0, 0, 0, 0, 12)
const ONE_DAY_DURATION = new Temporal.Duration(0, 0, 0, 1)
const ONE_WEEK_DURATION = new Temporal.Duration(0, 0, 0, 7)

type Type = (
  | "Duration" 
  | "Date"
)
type DurationType = (
  | "5 Minutes" 
  | "30 Minutes" 
  | "1 Hour" 
  | "5 Hours"
  | "12 Hours"
  | "1 Day"
  | "1 Week"
  | "Custom"
)
enum DurationUnit {
  Minutes = "Minutes",
  Hours = "Hours",
  Days = "Days",
  Weeks = "Weeks",
  Months = "Months",
  Years = "Years",
}

enum DueType {
  Immediately = "Immediately",
  AfterDuration = "AfterDuration",
}

class Store {
  durationValue = new Reactor(0)
  durationType = new Reactor(DueType.Immediately)
}

export function DueInput() {
  
  // const id = crypto.randomUUID()
  // const durationTypeId = crypto.randomUUID()
  // const durationUintId = crypto.randomUUID()
  // const durationValueId = crypto.randomUUID()

  // const [durationValue, wDurationValue] = $state(0)
  const [dueType, wDueType] = $state<DueType>(DueType.Immediately)
  // const [durationUint, wDurationUint] = $state<DurationUnit>(DurationUnit.Minutes)
  const [value, wValue] = $state<number | undefined>(undefined)
  const duration: Temporal.Duration = null as any


  function toImmediately() {
    wDueType(DueType.Immediately)
  }
  const title = dueType === DueType.Immediately
    ? "Immediately"
    : `In ${duration.toLocaleString()}`

  return (
    <div>
      Due: 
      
      <DropdownButton id="dropdown-basic-button" title={title}>
        <DropdownItem onClick={toImmediately}>Immediately</DropdownItem>
        <DropdownItem onClick={}>In Duration</DropdownItem>
      </DropdownButton>

      {dueType === DueType.Immediately
        ? <button>Immediately</button> 
        : <button>{duration.toString()}</button>
      }

      <button>
      </button>
      <select 
        value={dueType}
        onChange={e => wDueType(e.currentTarget.value as DueType)}
      >
        <option value={DueType.Immediately}>Immediately</option>
        <option value={DueType.InMinutes}>In Minutes</option>
        <option value={DueType.InHours}>In Hours</option>
        <option value={DueType.InWeeks}>In Weeks</option>
        <option value={DueType.InMonths}>In Months</option>
        <option value={DueType.InYears}>In Years</option>
      </select>

      {dueType === DueType.Immediately
        ? null
        : <input 
            type="number" 
            min={0} 
            value={value}
            onChange={e => wValue(parseInt(e.currentTarget.value))}
          />
      }
    </div>
  )
}

