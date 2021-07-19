import Backdrop from '../Backdrop/Backdrop'
import CancelIcon from '../../../assets/icon-cancel.svg'

import classes from './Dialog.module.scss'

type ComponentProps = {
  open: boolean
  title: string
  children: JSX.Element | JSX.Element[] | null
  closed: () => void
}

const closeClasses = [classes.Dialog, classes.Close].join(' ')
const openClasses = [classes.Dialog, classes.Open].join(' ')

const Dialog = ({
  open,
  title,
  children,
  closed,
}: ComponentProps): JSX.Element => {
  const onBackdropClicked = () => {
    closed()
  }

  return (
    <>
      <Backdrop show={open} clicked={onBackdropClicked} />
      <div className={open ? openClasses : closeClasses}>
        <div className={classes.Header}>
          <h5>{title}</h5>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <img
            className={classes.CancelIcon}
            src={CancelIcon}
            alt="cancelIcon"
            onClick={onBackdropClicked}
          />
        </div>
        {children}
      </div>
    </>
  )
}

export default Dialog
