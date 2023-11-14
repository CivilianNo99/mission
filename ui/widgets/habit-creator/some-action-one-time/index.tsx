import { ChangeEvent, useState } from "react"
import { Reactor } from "/utility/ui-state/reactor"
import { Store as CreatorStore } from "../store"
import css from "../style.module.css"

export class Store {
  titleId = crypto.randomUUID()
  descriptionId = crypto.randomUUID()

  title = new Reactor("")
  isTitleValid = new Reactor(false)
  titleValidityMessage = new Reactor("")

  description = new Reactor("")

  static new() {
    return new Store()
  }
}

export function SomeActionOneTimeUI({ creator }: { creator: CreatorStore }) {
  const [ store ] = useState(Store.new)
  return (
    <div>
      <Title store={store} />
      <Description store={store} />

      {/* <div><DueInput /></div>
      <div><Expiary /></div>
      <div><Recurrer /></div> */}

    </div>
  )
}

function Title({ store }: { store: Store }) {
  function update(e: ChangeEvent<HTMLTextAreaElement>) {
    store.title.update(e.currentTarget.value)
  }

  return (
    <div className={css.group}>
      <label htmlFor={store.titleId}>Task Title</label>

      <textarea
        className="textarea"
        id={store.titleId}
        value={store.title.use()}
        onChange={update}
      />
    </div>
  )
}

function Description({ store }: { store: Store }) {
  function update(e: ChangeEvent<HTMLTextAreaElement>) {
    store.description.update(e.currentTarget.value)
  }

  return (
    <div className={css.group}>
      <label htmlFor={store.descriptionId}>Task Description</label>

      <textarea
        id={store.descriptionId}
        value={store.description.use()}
        onChange={update}
        className="textarea"
      />
    </div>
  )
}