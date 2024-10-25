import React from 'react'
import styles from "./Error.module.scss"

const Error = ({text}) => {
  return (
<h1 className={styles.error}>{text}</h1>  )
}

export default Error