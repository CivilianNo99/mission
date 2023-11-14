import type { Store } from "./store";
import type { ChangeEvent } from "react";
import css from "./style.module.css"

export enum TaskType {
  SomeActionOneTime = "0",
  SameActionManyTimes = "1"
}

export function TaskTypeUI({ store }: { store: Store }) {
  function update(e: ChangeEvent<HTMLSelectElement>) {
    store.taskType.update(e.currentTarget.value as TaskType)
  }

  return (
    <div className={css.group}>
      <div><label htmlFor="">Task Type</label></div>

      <select value={store.taskType.use()} onChange={update}>
        <option value={TaskType.SomeActionOneTime}>Some Action One Time</option>
        <option value={TaskType.SameActionManyTimes}>Same Action Many Times</option>
      </select>
    </div>
  )
}