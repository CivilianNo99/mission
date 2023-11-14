import { ChangeEvent } from "react"
import { Store } from "./store"
import css from "./style.module.css"

export function HabitTitle({ store }: { store: Store }) {
  function update(e: ChangeEvent<HTMLInputElement>) {
    store.habitTitle.update(e.currentTarget.value)
  }

  return (
    <div className={css.group}>
      <div><label htmlFor={'habitTitleId'}>Habit Title:</label></div>

      <input
        type="text"
        id={'habitTitleId'}
        value={store.habitTitle.use()}
        onChange={update}
      />
    </div>
  )
}