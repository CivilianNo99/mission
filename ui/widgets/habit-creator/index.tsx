import css from "./style.module.css"
import { Store } from "./store";
import { useState } from "react"
import { Card } from "../card";
import { HabitDescription } from "./habit-description";
import { HabitTitle } from "./habit-title";
import { TaskType, TaskTypeUI } from "./task-type";
import { SomeActionOneTimeUI } from "./some-action-one-time";
import { Store as SomeActionOneTimeStore } from "./some-action-one-time/index"

export function HabitCreatorUI() {
  const [ store ] = useState(Store.new)
  const validity = store.validity.use()

  // const { isOpen } = creator.use()
  const [habitTitleId] = useState(() => crypto.randomUUID())
  const [habitDescriptionId] = useState(() => crypto.randomUUID())
  
  const habitTitle = store.habitTitle.use()
  const habitDescription = store.habitDescription.use()
  
  const taskDue = store.taskDue.use()
  const taskTitle = store.taskTitle.use()
  const taskExpiry = store.taskExpiary.use()
  const isTaskTitleTuched = store.isTaskTitleTouched.use()
  
  // function close() {
  //   store.taskDue.update(null)
  //   store.taskExpiary.update(null)
  //   store.habitDescription.update("")
  //   wDue(null)
  //   wExpiry(null)
  //   wHabitTitle('')
  //   creator.wIsOpen(false)
  // }
  // function create() {
  //   habits.add(Habit.new({
  //     description: habitTitle,
  
  //     task: SomeActionOneTime.SomeActionOneTimeTaskTemplate.new({
  //       description: taskTitle || habitTitle,
  //       timeDue: taskDue, 
  //       timeStale: taskExpiry,
  //     }),
  
  //     recurrer: DurationRecurrer.new({
  //       duration: new Temporal.Duration(0, 0, 0, 0, 0, 1)
  //     })
  //   }))
  
  //   close()
  // }

  // $(null, () => {
  //   if (!isTaskTitleTuched || taskTitle === '') {
  //     wTaskTitle(habitTitle)
  //   }
  // })

  return (    
    <div className={css.wrap}>
      <Card className={css["inner-wrap"]}>
        <HabitTitle store={store} />
        <HabitDescription store={store} />
        <TaskTypeUI store={store} />
        {store.taskType.use() === TaskType.SomeActionOneTime
          ? <SomeActionOneTimeUI creator={store} />
          : null
        }
      
        <div className={css.group}>
          <button className="btn blue" disabled={!validity}>Create</button>
        </div>
      </Card>
    
      {/* {isOpen}
      {#if enabled}
        <input 
          type="text"
          placeholder="Description"
          bind:value={description}
        >
    
        <input
          type=""
        >
        
        {:else}
        <button on:click={() => enabled = true}>Create</button>
      {/if} */}
    </div>
  )
}