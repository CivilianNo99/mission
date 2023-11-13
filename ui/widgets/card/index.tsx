import React from "react"
import classnames from "classnames"
import css from "./style.module.css"

export function Card(props: any) {
  return (
    <div className={classnames(css.wrapper, props.className)}>
      <div className="separator"></div>
    </div>
  )
}
