import { useState } from "react"
import { $ } from "/utility/react"

type Subscriptor<T> = (value: T) => void

export class Reactor<Value> {
  private value: Value
  private subscriptions: [symbol, Subscriptor<Value>][] = []

  constructor(value: Value) {
    this.value = value
  }

  use() {
    const [value, wValue] = useState(this.value)

    $([], () => {
      return this.subscribe(wValue)
    })

    return value
  }

  update(newValue: Value): void {
    this.value = newValue
    for (const [_, subscriptor] of this.subscriptions) {
      subscriptor(newValue)
    }
  }
  
  subscribe(subscriptor: Subscriptor<Value>) {
    subscriptor(this.value)

    const id = Symbol()
    this.subscriptions.push([id, subscriptor])

    return () => this.unsubscribe(id)
  }

  unsubscribe(id: symbol) {
    const idx = this.subscriptions.findIndex(subscriptor => subscriptor[0] === id)
    if (idx !== -1) {
      this.subscriptions.splice(idx, 1)
    }
  }
}