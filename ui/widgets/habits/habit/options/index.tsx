import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap"
import { useState } from "react"
import { FaEllipsisVertical } from "react-icons/fa6"
import { habits } from "/db/habits/store"

interface Props {
  habitId: string
}


export function OptionsUI({ habitId }: Props) {
  const [togglerId] = useState(() => crypto.randomUUID())
  
  function destroy() {
    habits.delete(habitId)
  }

  return (
    <Dropdown>
      <DropdownToggle id={togglerId}>
        <FaEllipsisVertical />
      </DropdownToggle>

      <DropdownMenu>
        <DropdownItem onClick={destroy}>Delete</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}