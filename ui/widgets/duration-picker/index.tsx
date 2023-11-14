import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import { Col } from "react-bootstrap"
import { useState } from "react"
import { FaMinus, FaPlus } from "react-icons/fa6"

export enum Unit {
  Minutes = "0",
  Hours = "1",
  Days = "2",
  Weeks = "3",
  Months = "4",
  Years = "5",
}

export function DurationPicker() {
  const [value, wValue] = useState(0)
  const [unit, wUnit] = useState(Unit.Minutes)

  return (
    <Container>
      <Row>
        <select value={unit} onChange={e => wUnit(e.currentTarget.value as Unit)}>
          <option value={Unit.Minutes}>Minutes</option>
          <option value={Unit.Hours}>Hours</option>
          <option value={Unit.Days}>Days</option>
          <option value={Unit.Weeks}>Weeks</option>
          <option value={Unit.Months}>Months</option>
          <option value={Unit.Years}>Years</option>
        </select>
      </Row>

      <Row>
        <Col>
          <button><FaPlus /></button>
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
          <button><FaMinus /></button>
        </Col>
      </Row>

      <Row>
        <p>Total Time</p>
      </Row>
    </Container>
  )
}