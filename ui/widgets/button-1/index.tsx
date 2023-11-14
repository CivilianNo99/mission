import React from "react"
import css from "./style.module.css"


type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

/**
 * Renders a white floating button.
 */
export function Button1(props: Props) {
  return (
    <button {...props} className={css.wrap}>

    </button>
  )
}