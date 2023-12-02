import React from "react"
import css from "./style.module.scss"

export function Card() {
  return (
    <div className={css.card}>
      <div className={css.header}>
        <p>Task Options</p>
      </div>

      <div className={css.divider}></div>
      {/* <div>
        <p>Hello There</p>
      </div>

      <div className={css.divider}></div> */}

      <div className={css.footer}>
        <button>kill</button>
        <button>die</button>
      </div>
    </div>
  )
}
