import { MutableRefObject, useState } from 'react'

import classes from './Card.module.scss'

type ComponentProps = {
  open: boolean
  refElement?: MutableRefObject<HTMLDivElement | null>
  children: JSX.Element | JSX.Element[]
  sideMenu?: JSX.Element | JSX.Element[] | null
}

const closeClasses = [classes.Card, classes.Close].join(' ')
const openClasses = [classes.Card, classes.Open].join(' ')
const openSideMenuClasses = [classes.SideMenu, classes.OpenSideMenu].join(' ')
const closeSideMenuClasses = [classes.SideMenu, classes.CloseSideMenu].join(' ')
const openButtonClasses = [classes.Button, classes.OpenButton].join(' ')
const closeButtonClasses = [classes.Button, classes.CloseButton].join(' ')

const Card = ({
  open,
  refElement,
  children,
  sideMenu,
}: ComponentProps): JSX.Element => {
  const [showSideMenu, setShowSideMenu] = useState(false)

  const onSideMenuIconClicked = () => {
    setShowSideMenu((show) => !show)
  }

  return (
    <div className={open ? openClasses : closeClasses} ref={refElement}>
      {sideMenu && (
        <>
          <div
            className={
              showSideMenu ? openSideMenuClasses : closeSideMenuClasses
            }
          >
            {sideMenu}
          </div>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div
            className={showSideMenu ? openButtonClasses : closeButtonClasses}
            onClick={onSideMenuIconClicked}
          />
        </>
      )}
      {children}
    </div>
  )
}

export default Card
