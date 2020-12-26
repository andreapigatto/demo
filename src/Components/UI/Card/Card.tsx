import { MutableRefObject } from 'react'

import classes from './Card.module.scss'

type ComponentProps = {
  open: boolean
  refElement?: MutableRefObject<HTMLDivElement | null>
  children: JSX.Element | JSX.Element[]
}

const closeClasses = [classes.Card, classes.Close].join(' ')
const openClasses = [classes.Card, classes.Open].join(' ')

const Card = ({ open, refElement, children }: ComponentProps): JSX.Element => {
  return (
    <div className={open ? openClasses : closeClasses} ref={refElement}>
      {children}
    </div>
  )
}

export default Card
