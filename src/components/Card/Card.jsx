import React from 'react'
import styles from './card.module.css'

const Card = ({children,className}) => {
  return (
    <div className={`${styles.card} ${className}`}>{children}</div>
  )
}

export default Card