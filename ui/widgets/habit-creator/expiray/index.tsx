import { $state } from "/utility/react"
import { Temporal } from "@js-temporal/polyfill";


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

enum ExpiaryType {
  Never = "Never",
  InMinutes = "InMinutes",
  InHours = "InHours",
  InDays = "InDays",
  InWeeks = "InWeeks",
  InMonths = "InMonths",
  InYears = "InYears",
}

export function Expiary() {
  const id = crypto.randomUUID()
  // const durationTypeId = crypto.randomUUID()
  // const durationUintId = crypto.randomUUID()
  // const durationValueId = crypto.randomUUID()

  const [expiaryType, wExpiaryType] = $state(ExpiaryType.Never)
  const [value, wValue] = $state<number>(1)
  

  // $: {
  //   switch (durationType) {
  //     case "5 Minutes": 
  //       value = FIVE_MINUTES_DURATION
  //       break

  //     case "30 Minutes": 
  //       value = THIRTY_MINUTES_DURATION
  //       break

  //     case "1 Hour": 
  //       value = ONE_HOUR_DURATION
  //       break

  //     case "5 Hours": 
  //       value = FIVE_HOURS_DURATION
  //       break

  //     case "12 Hours": 
  //       value = TWELVE_HOURS_DURATION
  //       break

  //     case "1 Day": 
  //       value = ONE_DAY_DURATION
  //       break

  //     case "1 Week": 
  //       value = ONE_WEEK_DURATION
  //       break

  //     case "Custom": 
  //       switch (durationUint) {
  //         case "Minutes": 
  //           value = new Temporal.Duration(0, 0, 0, 0, 0, durationValue)
  //           break

  //         case "Hours": 
  //           value = new Temporal.Duration(0, 0, 0, 0, durationValue)
  //           break

  //         case "Days": 
  //           value = new Temporal.Duration(0, 0, 0, durationValue)
  //           break

  //         case "Weeks": 
  //           value = new Temporal.Duration(0, 0, 0, durationValue * 7)
  //           break

  //         case "Months": 
  //           value = new Temporal.Duration(0, durationValue)
  //           break

  //         case "Years": 
  //           value = new Temporal.Duration(0, durationValue)
  //           break
  //       }
  //   }
  // }

  return (
    <div>
      <label htmlFor={id}>Expires:</label>
      <select 
        value={expiaryType} 
        onChange={e => wExpiaryType(e.currentTarget.value as ExpiaryType)}
      >
        <option value={ExpiaryType.Never}>Never</option>
        <option value={ExpiaryType.InMinutes}>In Minutes</option>
        <option value={ExpiaryType.InHours}>In Hours</option>
        <option value={ExpiaryType.InDays}>In Days</option>
        <option value={ExpiaryType.InWeeks}>In Weeks</option>
        <option value={ExpiaryType.InMinutes}>In Months</option>
        <option value={ExpiaryType.InYears}>In Years</option>
      </select>

      {expiaryType === ExpiaryType.Never
        ? null
        : <input 
            min={1}
            type="number" 
            value={value}
            onChange={e => wValue(parseInt(e.currentTarget.value))}
          />
      }

    </div>
  )
}