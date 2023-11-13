import React from "react"
import { useState, useEffect } from "react"


export { React }
export const $state = useState
export function $(deps: any[] | null, cb: any) {
  if (deps === null) {
    useEffect(cb)
  } else {
    useEffect(cb, deps)
  }
}
