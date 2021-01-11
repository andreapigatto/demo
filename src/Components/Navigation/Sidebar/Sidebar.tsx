import { MouseEvent } from 'react'

import Logo from '../../../assets/logo.svg'
import ChartIcon from '../../../assets/icon-chart.svg'
import BellIcon from '../../../assets/icon-bell.svg'
import SettingsIcon from '../../../assets/icon-settings.svg'
import HelpIcon from '../../../assets/icon-help.svg'
import AvatarImage from '../../../assets/avatar.png'
import classes from './Sidebar.module.scss'

type ComponentProps = {
  viewSelected: string
  iconClicked: (name: string) => void
}

const Sidebar = ({
  viewSelected,
  iconClicked,
}: ComponentProps): JSX.Element => {
  const onClickIcon = (event: MouseEvent<HTMLImageElement>) => {
    iconClicked((event.target as HTMLImageElement).id)
  }

  return (
    <>
      <div className={classes.Sidebar}>
        <div className={classes.Header}>
          <img className={classes.Logo} src={Logo} alt="logo" />
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <img
            id="Chart"
            className={
              viewSelected === 'Chart' ? classes.IconPressed : classes.Icon
            }
            src={ChartIcon}
            onClick={onClickIcon}
            alt="chartIcon"
          />
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <img
            id="Settings"
            className={
              viewSelected === 'Settings' ? classes.IconPressed : classes.Icon
            }
            src={SettingsIcon}
            onClick={onClickIcon}
            alt="settingsIcon"
          />
        </div>
        <div className={classes.Footer}>
          <img className={classes.Icon} src={BellIcon} alt="bellIcon" />
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <img
            id="Help"
            className={
              viewSelected === 'Help' ? classes.IconPressed : classes.Icon
            }
            src={HelpIcon}
            onClick={onClickIcon}
            alt="helpIcon"
          />
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
          <img
            id="User"
            className={
              viewSelected === 'User' ? classes.IconPressed : classes.Icon
            }
            src={AvatarImage}
            onClick={onClickIcon}
            alt="userIcon"
          />
        </div>
      </div>
    </>
  )
}

export default Sidebar
