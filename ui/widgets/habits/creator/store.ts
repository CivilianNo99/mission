import { createStore } from "/utility/store"

// export const creator = new Store({
//   isOpen: false
// })

export const creator = {
  ...createStore({
    isOpen: false
  }),

  wIsOpen(value: boolean) {
    creator.update({ isOpen: value })
  },
}