import Card from '../../../Components/UI/Card/Card'

import classes from './User.module.scss'

type ComponentProps = {
  open: boolean
}

const User = ({ open }: ComponentProps) => {
  return (
    <Card open={open}>
      <p className={classes.Title}>Username</p>
      <p className={classes.Title}>password</p>
    </Card>
  )
}

export default User
