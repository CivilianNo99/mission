import { habits } from "/db/habits/store"
// import MdDeleteForever from "svelte-icons/md/MdDeleteForever.svelte"
import style from "./style.module.css"

interface Props {
  id: string
}
export function Habit({ id }: Props) {
  const habit = habits.useOne(id)

  function destroy() {
    habits.delete(id)
  }

  return (
    <div className={style.wrapper}>
      {habit
      ? <>
          <div>{habit.description}</div>
          <button onClick={destroy} className="icon">
            {/* <MdDeleteForever /> */}
            X
          </button>
        </>
      : <div>Habit not found</div>
      }
    </div>
  )
}
