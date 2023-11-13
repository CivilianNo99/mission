import { Temporal } from "@js-temporal/polyfill";
import { $state, React, $ } from "/utility/react"
import css from "./style.module.css"


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
  
  InMinutes = "InMinutes",
  InHours = "InHours",
  InWeeks = "InWeeks",
  InMonths = "InMonths",
  InYears = "InYears",

  // AtMinute = "AtMinute",
  // AtHour = "AtHour",
  // AtDay = "AtDay",
  // At
}
/** 
 * title [Wash your face every day]
 * task [Wash your face]
 * 
 * due [immediately]
 *     [in] [minutes] [value]
 *          [hours] [value]
 *          [weeks] [value]
 *          [months] [value]
 *          [years] [value]
 *     [at] [minute] [value]
 *          [hour] [value] [minute] [value]
 *          [month] [value] [day of month] [hour] [value] [minute] [value]
 *          [year] [value] [month] [value] [day]
 * 
 * expires [never]
 *         [in] [value] [minutes]
 *              [hours]
 *              [days]
 *              [weeks]
 *              [months]
 *              [years]
 *         [at] [minute] [minute-value]
 *              [hour] [hour-value] [minute-value]
 *              [day of week] [day-of-week-value] [hour-value] [minute-value]
 *              [day of month] [day-of-month-value] [hour-value] [minute-value]
 *              [day of year] [day-of-year-value] [hour-value] [minute-value]
 *              [day of year] [day-of-year-value] [hour-value] [minute-value]
*/
export function DueInput() {
  // const id = crypto.randomUUID()
  // const durationTypeId = crypto.randomUUID()
  // const durationUintId = crypto.randomUUID()
  // const durationValueId = crypto.randomUUID()

  // const [durationValue, wDurationValue] = $state(0)
  const [durationType, wDurationType] = $state<DueType>(DueType.Immediately)
  // const [durationUint, wDurationUint] = $state<DurationUnit>(DurationUnit.Minutes)
  const [value, wValue] = $state<number | undefined>(undefined)
  // const [isOpen, wIsOpen] = $state(false)

  // function open() {
  //   wIsOpen(true)
  // }

  // function close() {
  //   wIsOpen(false)
  //   wDurationUint(DurationUnit.Minutes)
  //   wDurationType(DueType.Immediately)
  //   wDurationValue(0)
  // }

  $([], () => {
    console.log(value)
  })

  // function calcuateDurationCalue() {
  //   switch (durationType) {
  //     case "5 Minutes": return FIVE_MINUTES_DURATION
  //     case "30 Minutes": return THIRTY_MINUTES_DURATION
  //     case "1 Hour": return ONE_HOUR_DURATION
  //     case "5 Hours": return FIVE_HOURS_DURATION
  //     case "12 Hours": return TWELVE_HOURS_DURATION
  //     case "1 Day": return ONE_DAY_DURATION
  //     case "1 Week": return ONE_WEEK_DURATION
  //     case "Custom": 
  //       switch (durationUint) {
  //         case "Minutes": return new Temporal.Duration(0, 0, 0, 0, 0, durationValue)
  //         case "Hours": return new Temporal.Duration(0, 0, 0, 0, durationValue)
  //         case "Days": return new Temporal.Duration(0, 0, 0, durationValue)
  //         case "Weeks": return new Temporal.Duration(0, 0, 0, durationValue * 7)
  //         case "Months": return new Temporal.Duration(0, durationValue)
  //         case "Years": return new Temporal.Duration(0, durationValue)
  //       }
  //   }
  // }


  return (
    <div>
      Due: 
      <select 
        value={durationType}
        onChange={e => wDurationType(e.currentTarget.value as DueType)}
      >
        <option value={DueType.Immediately}>Immediately</option>
        <option value={DueType.InMinutes}>In Minutes</option>
        <option value={DueType.InHours}>In Hours</option>
        <option value={DueType.InWeeks}>In Weeks</option>
        <option value={DueType.InMonths}>In Months</option>
        <option value={DueType.InYears}>In Years</option>
      </select>

      {durationType === DueType.Immediately
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