import { habits as habitsStore } from "/db/habits/store"
// import { Creator } from "./creator/index"
import { Habit as HabitUi } from "./habit"
import { Habit } from "/db/habits/Habite"
// import { creator } from "./creator/store"
import css from "./style.module.css"
import { Button1 } from "../button-1"

export function Habits() {
  const habits: Habit[] = habitsStore.useAll()
  // const { isOpen } = creator.use()

  // function openCreator() {
  //   creator.wIsOpen(true)
  // }
  

  return (
    <div className={css.wrap}>
      <a href="/create-habit">New Habit</a>
      <div className={css.habits}>
        {habits.map(habit => 
          <HabitUi key={habit.id} id={habit.id} />
        )}
      </div>
    </div>
  )
}