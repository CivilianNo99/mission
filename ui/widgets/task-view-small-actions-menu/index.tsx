import Dropdown from 'react-bootstrap/Dropdown';
import { FaEllipsisVertical } from "react-icons/fa6";
import { tasks } from '/db/tasks/store';

interface Props {
  taskId: string
}

export function OptionsUI({ taskId }: Props) {
  function destroy() {
    tasks.delete(taskId)
  }

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        <FaEllipsisVertical />        
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={destroy}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
