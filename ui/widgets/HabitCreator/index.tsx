import { FormInput } from "../FormInput"
import style from "./style.module.scss"

export function HabitCreator() {
  return (
    <div className={style.wrap}>
      <p>habit</p>

      <p>name</p>
      {/* <input type="text" /> */}
      <FormInput />

      <p>task</p>
      
      <p>name</p>
      <FormInput />
      {/* <input type="text" /> */}

      <p>type</p>
      <select>
        <option>Some Action One Time</option>
        <option>Same Action Many Times</option>
      </select>

      <footer>
        <button>Cancel</button>
        <button>Create</button>
      </footer>
    </div>
  )
}