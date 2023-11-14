import { TaskType } from "./task-type"
import { Reactor } from "/utility/ui-state/reactor"

export class Store {
  validity = new Reactor(false)
  
  habitTitle = new Reactor("")
  habitTitleValidity = new Reactor(false)
  habitTitleValidityMessage = new Reactor("")
  habitDescription = new Reactor("")
  habitDescriptionValidity = new Reactor(true)

  taskType = new Reactor(TaskType.SomeActionOneTime)
  taskTitle = new Reactor("")
  taskTitleValidity = new Reactor(false)
  taskDescription = new Reactor("")
  taskDescriptionValidity = new Reactor(true)

  isTaskTitleTouched = new Reactor(false)

  taskDue = new Reactor(null as any)
  taskExpiary = new Reactor(null as any)
  taskRecurrer = new Reactor(null as any)

  constructor() {
    this.habitTitle.subscribe(title => {
      if (title === "") {
        this.habitTitleValidity.update(false)
        this.habitTitleValidityMessage.update("Habit title is required")
      }
    })

    // this.taskTitle.subscribe(title => {
    //   this.isTaskTitleTouched.update()
    // })
  }

  static new() {
    return new Store()
  }
}