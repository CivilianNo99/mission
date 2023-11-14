import { Container } from "../container";
// import { TaskCreatorUI } from "./creator";
import { TaskUI } from "./task";
import { tasks } from "/db/tasks/store";
import css from "./style.module.css"

export function TasksUI() {
  const all = tasks.useAll()

  return (
    <Container className={css.wrap}>
      {/* <TaskCreatorUI /> */}

      <a href="/create-task">New Task</a>

      <div className={css.tasks}>
        {all.map(task => 
          <TaskUI id={task.id} key={task.id} />
        )}
      </div>
    </Container>
  )
}