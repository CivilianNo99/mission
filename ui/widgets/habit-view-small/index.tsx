import { habits } from "/db/habits/store"
import style from "./style.module.css"
import { OptionsUI } from "./options"

interface Props {
  id: string
}
export function Habit({ id }: Props) {
  const habit = habits.useOne(id)

  if (!habit) {
    return  (
      <div className={style.wrapper}>
        <div>Habit not found</div>
      </div>
    )
  }

  return (
    <div className={style.wrapper}>
      <div>{habit.description}</div>
      <OptionsUI habitId={id} />
    </div>
  )
}
