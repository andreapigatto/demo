import Card from '../../../Components/UI/Card/Card'

import classes from './Info.module.scss'

type ComponentProps = {
  open: boolean
}

const Info = ({ open }: ComponentProps): JSX.Element => {
  return (
    <Card open={open}>
      <div className={classes.Text}>
        <h5>Overview</h5>
        <p>...</p>
        <h5>Data</h5>
        <p>...</p>
        <h5>Usage</h5>
        <p>...</p>
        <h5>Controls</h5>
        <h6>Number of Steps</h6>
        <p>...</p>
        <h5>Style</h5>
        <h6>Colors</h6>
        <p>...</p>
      </div>
    </Card>
  )
}

export default Info
