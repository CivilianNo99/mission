import { React, $ } from "/utility/react"
import { Temporal } from "@js-temporal/polyfill";
import { habits } from "/db/habits/store"
import { Habit } from "/db/habits/Habite"
import { SomeActionOneTime } from "/db/tasks/Templates"
import { DurationRecurrer } from "/db/Recurrers"
import { useState as $state } from "react"
import css from "./style.module.css"
import { creator } from "./store";
import { DueInput } from "./due";
import { Expiary } from "./expiray";
import { Recurrer } from "./recurrer";

function $static<T>(value: T) {
  return $state(value)[0]
}

export function Creator() {
  // const { isOpen } = creator.use()
  const habitTitleId = $static(crypto.randomUUID())
  const taskTitleId = $static(crypto.randomUUID())
  
  const [due, wDue] = $state<Temporal.Duration | null>(null)
  const [expiry, wExpiry] = $state<Temporal.Duration | null>(null)
  const [habitTitle, wHabitTitle] = $state('')
  const [taskTitle, wTaskTitle] = $state('')
  const [isTaskTitleTuched, wIsTaskTitleTuched] = $state(false)
  
  function close() {
    wDue(null)
    wExpiry(null)
    wHabitTitle('')
    creator.wIsOpen(false)
  }
  function create() {
    habits.add(Habit.new({
      description: habitTitle,
  
      task: SomeActionOneTime.SomeActionOneTimeTaskTemplate.new({
        description: taskTitle || habitTitle,
        timeDue: due, 
        timeStale: expiry,
      }),
  
      recurrer: DurationRecurrer.new({
        duration: new Temporal.Duration(0, 0, 0, 0, 0, 1)
      })
    }))
  
    close()
  }

  $(null, () => {
    if (!isTaskTitleTuched || taskTitle === '') {
      wTaskTitle(habitTitle)
    }
  })

  return (    
    <div className={css.wrapper}>
      <div className="group">
        <p>
          <label htmlFor={habitTitleId}>Habit Title:</label>
        </p>
        <textarea
          id={habitTitleId}
          value={habitTitle}
          onChange={e => wHabitTitle(e.currentTarget.value)}
          placeholder="What is this habit about?" 
        />
      </div>
    
      <div className="group">
        <p>
          <label htmlFor={habitTitleId} >Task Title:</label>
          {/* <!-- Task Title: --> */}
        </p>
        <textarea
          id={taskTitleId}
          className="textarea"
          value={taskTitle}
          onChange={e => {
            wIsTaskTitleTuched(true)
            wTaskTitle(e.currentTarget.value)
          }}
          placeholder="What is this task about?" 
        />
      </div>

      <div>
        <DueInput />
      </div>
    
      <div>
        <Expiary />
      </div>
    
      <div>
        <Recurrer />
      </div>
    
    
    
      <div>
        <button className="btn blue" onClick={create}>Create</button>
        <button className="btn red" onClick={close}>Cancel</button>
      </div>
    
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

// function onTaskTitleChange(e: ) {
//   // e => (e.target HTMLTextAreaElement ).
// }
