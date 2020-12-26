import BurgerIcon from '../../../../assets/icon-burger.svg'
import BackIcon from '../../../../assets/icon-back.svg'

import classes from './SidebarIcon.module.scss'

type ComponentProps = {
  type: boolean
  sidebarIconClicked: () => void
}

const SidebarIcon = ({ type, sidebarIconClicked }: ComponentProps) => {
  const onClickIcon = () => {
    sidebarIconClicked()
  }

  return (
    <div className={classes.Icon}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
      <img
        src={type ? BackIcon : BurgerIcon}
        onClick={onClickIcon}
        alt="userIcon"
      />
    </div>
  )
}

export default SidebarIcon
