import type { ChangeEvent } from "react"
import type { Store } from "./store"
import css from "./style.module.css"

export function HabitDescription({ store }: { store: Store }) {
  function update(e: ChangeEvent<HTMLTextAreaElement>) {
    store.habitDescription.update(e.currentTarget.value)
  }

  return (
    <div className={css.group}>
      <p>
        <label htmlFor={"habitDescriptionId"}>Habit Description:</label>
      </p>
      <textarea
        id={"habitDescriptionId"}
        value={store.habitDescription.use()}
        onChange={update}
      />
    </div>
  )
}