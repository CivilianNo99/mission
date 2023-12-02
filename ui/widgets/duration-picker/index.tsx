import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import { Col } from "react-bootstrap"
import { useState } from "react"
import { FaMinus, FaPlus } from "react-icons/fa6"
import { Temporal } from "@js-temporal/polyfill"
import format from "format-duration"

export enum Unit {
  Minutes = "0",
  Hours = "1",
  Days = "2",
  Weeks = "3",
  // Months = "4",
  // Years = "5",
}

const SECOND_MS = 1000
const MINUTE_MS = SECOND_MS * 60
const HOUR_MS = MINUTE_MS * 60
const DAY_MS = HOUR_MS * 24
const WEEK_MS = DAY_MS * 7

function getTotalDuration(unit: Unit, value: number) {
  switch (unit) {
    case Unit.Minutes: return format(value * MINUTE_MS)
    case Unit.Hours: return format(value * HOUR_MS)
    case Unit.Days: return format(value * DAY_MS)
    case Unit.Weeks: return format(value * WEEK_MS)
    // case Unit.Months: return new Temporal.Duration(0, value).toString()
    // case Unit.Years: return new Temporal.Duration(value).toString()
  }

}
function formatDuration(unit: Unit, value: number) {
  switch (unit) {
    case Unit.Minutes:
    case Unit.Hours:
    case Unit.Days:
    case Unit.Weeks:
  }

}

const MINUTES_PER_HOUR = 60
const MINUTES_PER_DAY = MINUTES_PER_HOUR * 24
const MINUTES_PER_WEEK = MINUTES_PER_DAY * 7
const MINUTES_PER_MONTH = MINUTES_PER_DAY * 30
const MINUTES_PER_YEAR = MINUTES_PER_DAY * 360

function formatMinutes(value: number) {
  if (value === 0) { 
    return "immediately"
  }
  if (value === 1) {
    return "1 minute"
  }
  if (value < MINUTES_PER_HOUR) {
    return `${value} minutes`
  }
  if (value < MINUTES_PER_DAY) {
    return `${value / MINUTES_PER_HOUR} hours`
  }
  if (value < MINUTES_PER_MONTH) {
    return `${value / MINUTES_PER_DAY} days`
  }
  if (value < MINUTES_PER_YEAR) {
    return `${value / MINUTES_PER_MONTH} months`
  }
  return `${value / MINUTES_PER_YEAR} years`
}

const HOURS_PER_DAY = 24
const HOURS_PER_WEEK = HOURS_PER_DAY * 7
const HOURS_PER_MONTH = HOURS_PER_DAY * 30
const HOURS_PER_YEAR = HOURS_PER_DAY * 360

function formatHours(value: number) {
  if (value === 0) {
    return "immediately"
  }
  if (value === 1) {
    return "1 hour"
  }
  if (value < HOURS_PER_DAY) {
    return `${value} hours`
  }
  if (value < HOURS_PER_MONTH) {
    return `${value / HOURS_PER_DAY} days`
  }
  if (value < HOURS_PER_YEAR) {
    return `${value / HOURS_PER_MONTH} months`
  }
  return `${value / HOURS_PER_YEAR}`
}

const DAYS_PER_WEEK = 7
const DAYS_PER_MONTH = 30
const DAYS_PER_YEAR = 360

function formatDays(value: number) {
  if (value === 0) {
    return "immediately"
  }
  if (value === 1) {
    return "1 day"
  }
  if (value < DAYS_PER_WEEK) {
    return  `${value} days`
  }
  if (value < DAYS_PER_MONTH) {
    
  }
}
function formatWeeks(value: number) {

}

export function DurationPicker() {
  const [value, wValue] = useState(0)
  const [unit, wUnit] = useState(Unit.Minutes)

  function increase() {
    wValue(value + 1)
  }
  function decrease() {
    if (value > 0) {
      wValue(value - 1)
    }
  }
  return (
    <Container>
      <Row>
        <select value={unit} onChange={e => wUnit(e.currentTarget.value as Unit)}>
          <option value={Unit.Minutes}>Minutes</option>
          <option value={Unit.Hours}>Hours</option>
          <option value={Unit.Days}>Days</option>
          <option value={Unit.Weeks}>Weeks</option>
          {/* <option value={Unit.Months}>Months</option> */}
          {/* <option value={Unit.Years}>Years</option> */}
        </select>
      </Row>

      <Row>
        <Col>
          <button onClick={decrease}><FaMinus /></button>
        </Col>

        <Col>
          <input 
            type="number" 
            min={0}
            value={value}
            onChange={e => wValue(parseInt(e.currentTarget.value))}
          />
        </Col>

        <Col>
          <button onClick={increase}><FaPlus /></button>
        </Col>
      </Row>

      <Row>
        <p>{getTotalDuration(unit, value)}</p>
      </Row>
    </Container>
  )
}