import { $, $state } from "/utility/react"

export type Subscriptor<T> = (value: T) => unknown

export class Store<Value> {
  private readonly subscriptions: [symbol, Subscriptor<any>][] = []

  constructor(public value: Value) {}
  
  update(value: Value): void {
    this.value = value

    for (const [_, subscriptor] of this.subscriptions) {
      subscriptor(value)
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

  use() {
    const [value, wValue] = $state<Value>(this.value) 
  
    $([], () => {
      return this.subscribe(wValue)
    })
  
    return value
  }
}

export function createStore<Value>(value: Value) {
  const subscriptions: [symbol, Subscriptor<Value>][] = []
  
  const update = (value: Value) => {
    value = value

    for (const [_, subscriptor] of subscriptions) {
      subscriptor(value)
    }
  }
  const subscribe = (subscriptor: Subscriptor<Value>) => {
    subscriptor(value)

    const id = Symbol()
    subscriptions.push([id, subscriptor])

    return () => unsubscribe(id)
  }
  const unsubscribe = (id: symbol) => {
    const idx = subscriptions.findIndex(subscriptor => subscriptor[0] === id)
    if (idx !== -1) {
      subscriptions.splice(idx, 1)
    }
  }
  const use = () => {
    const [_value, wValue] = $state<Value>(value) 
  
    $([], () => {
      return subscribe(wValue)
    })
  
    return _value
  }

  return {
    update,
    subscribe,
    unsubscribe,
    use,
  }
}