import Card from '../../../Components/UI/Card/Card'

import classes from './Info.module.scss'

type ComponentProps = {
  open: boolean
}

const Info = ({ open }: ComponentProps) => {
  return (
    <Card open={open}>
      <p className={classes.Title}>
        This notebook displays play sequences for all 2009-2019 regular season
        NFL drives as an interactive Sunburst chart. Each play is represented by
        an arc with colors corresponding to different play types. Sequences are
        put together by traversing concentric circles from the center outward.
        The angle span.......
      </p>
    </Card>
  )
}

export default Info
