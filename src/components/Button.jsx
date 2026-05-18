import React from 'react'
import Styles from "./Button.module.css"

function Button({children, onClick, type}) {
  return (
    <button onClick={onClick} className={`${Styles.btn} ${Styles[type]}`}>
      {children}
    </button>
  )
}

export default Button;




