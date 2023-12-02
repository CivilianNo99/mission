import style from "./style.module.scss"
import { Check } from "@mui/icons-material"

interface Props {
  checked: boolean
  onChange: (checked: boolean) => void
}

export function Checkbox({ checked, onChange }: Props) {
  return (
    <div 
      className={style.checkbox}
      onClick={() => onChange(!checked)}
    >
      {checked 
        ? <Check fontSize="20px"/>
        : null
      }
    </div>
  )
}