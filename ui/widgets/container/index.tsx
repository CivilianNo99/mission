import classnames from "classnames"
import css from "./style.module.css"


type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

// type Props = 
export function Container(props: Props) {
  return (
    <div {...props} className={classnames(props.className, css.container)}></div>
  )
}