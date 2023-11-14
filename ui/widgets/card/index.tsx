import React from "react"
import classnames from "classnames"
import css from "./style.module.css"

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export function Card(props: Props) {
  return (
    <div {...props} className={classnames(css.card, props.className)}>
      {/* <div className="separator"></div> */}
    </div>
  )
}
