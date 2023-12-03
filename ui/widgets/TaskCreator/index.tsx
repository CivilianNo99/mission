import style from "./style.module.scss"
import { FaPlus } from "react-icons/fa6"


export function TaskCreator() {
  return (
    <div className={style.wrap}>
      <input type="text" />
      <button type="button"><FaPlus /></button>
    </div>
  )
}