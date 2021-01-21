import React from 'react'

// CSS styles
import classes from './Backdrop.module.scss'

type ComponentProps = {
  show: boolean
  clicked: () => void
}

const Backdrop = (props: ComponentProps) => {
  const { show, clicked } = props

  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
  return show ? <div className={classes.Backdrop} onClick={clicked} /> : null
}

export default Backdrop
