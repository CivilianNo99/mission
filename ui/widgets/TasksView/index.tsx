import { Container } from "../container";
// import { TaskCreatorUI } from "./creator";
import { TaskViewSmall } from "../TaskViewSmall";
import { tasks } from "/db/tasks/store";
import css from "./style.module.css"
// import { Divider } from "../Divider";

export function TasksView() {
  const all = tasks.useAll()

  return (
    <Container className={css.wrap}>
      <a href="/create-task">New Task</a>

      <div className={css.tasks}>
        {all.map(task =>
          <TaskViewSmall id={task.id} key={task.id} />
        )}
      </div>
    </Container>
  )
}