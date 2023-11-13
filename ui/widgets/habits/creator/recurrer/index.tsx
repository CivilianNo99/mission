import { $, $state as useState} from "/utility/react"

enum RecurringType {
  Custom = "Custom",

  EveryFiveMinutes = "EveryFiveMinutes",
  EveryTenMinutes = "EveryTenMinutes",
  EveryThirtyMinutes = "EveryThirtyMinutes",
  EveryHour = "every-hour",
  EveryDay = "every-day",
  EveryWeek = "every-week",
  EveryMonth = "every-month",
  EveryYear = "every-year",

  EveryWeekendStart = "every-weekend-start",
  EveryWorkkweekStart = "every-workweek-start",

  AtParticularHoursOfDay = "at-particular-hours",
  AtParticularDaysOfWeek = "at-particular-days-of-week",
  AtParticularDaysOfMonth = "at-particular-days-of-month",
  AtParticularDaysOfYear = "at-particular-days-of-year",
  AtParticularMonths = "at-particular-months",
}

export function Recurrer() {
  const [recurrerTypeId] = useState(() => crypto.randomUUID())
  const [recurringType, wRecurringType] = useState(RecurringType.EveryTenMinutes)
  

  return (
    <p>
      <label htmlFor={recurrerTypeId}>Recurs:</label>
      <select 
        name="recurrer-type" 
        title="Recurrer Type" 
        id={recurrerTypeId}
        value={recurringType}
        onChange={e => wRecurringType(e.currentTarget.value as RecurringType)}
      >
        <option value={RecurringType.Custom}>Custom</option>

        <option value={RecurringType.EveryFiveMinutes}>Every Five Minutes</option>
        <option value={RecurringType.EveryTenMinutes}>Every Ten Minutes</option>
        <option value={RecurringType.EveryThirtyMinutes}>Every Thirty Minutes</option>
        <option value={RecurringType.EveryHour}>Every Hour</option>
        <option value={RecurringType.EveryDay}>Every Day</option>
        <option value={RecurringType.EveryWeek}>Every Week</option>
        <option value={RecurringType.EveryMonth}>Every Month</option>
        <option value={RecurringType.EveryYear}>Every Year</option>
        
        <option value={RecurringType.EveryWeekendStart}>Every Weekend Start</option>
        <option value={RecurringType.EveryWorkkweekStart}>Every Workweek Start</option>

        <option value={RecurringType.AtParticularHoursOfDay}>At Particular Hours</option>
        <option value={RecurringType.AtParticularDaysOfWeek}>At Particular Days of Week</option>
        <option value={RecurringType.AtParticularDaysOfMonth}>At Particular Days of Month</option>
        <option value={RecurringType.AtParticularDaysOfYear}>At Particular Days of Year</option>
        <option value={RecurringType.AtParticularMonths}>At Particular Months</option>
      </select>
    </p>
  )
}