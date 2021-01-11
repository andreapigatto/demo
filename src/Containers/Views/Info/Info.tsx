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
        <p>
          This extension displays a <strong>Sunburst chart</strong>.
        </p>
        <p>
          A Sunburst chart is ideal for displaying hierarchical data. Each level
          of the hierarchy is represented by one ring or circle with the
          innermost circle as the top of the hierarchy. A sunburst chart with
          multiple levels of categories shows how the outer rings relate to the
          inner rings.
        </p>
        <p>
          It is ideal to analyze a process, a sequence of tasks or events where
          we want to investigate which are the most frequent paths or sequences
          of the process and in which proportion each task is related to its
          subtasks.
        </p>
        <h5>Data</h5>
        <p>For demo purposes...</p>
        <h5>Usage</h5>
        <p>...</p>
        <h5>Controls</h5>
        <h6>Number of Steps</h6>
        <p>
          It is controlling the number of steps we want to visualize. You can
          increase or reduce the level of depth we want to consider for the
          hierarchy.
        </p>
        <h6>Minimum Arcs Angle</h6>
        <p>
          With this control you can filter arcs from been visualized in case
          they are under the configured threshold. In this way data with low
          frequency will be not considered on the visualization.
        </p>
        <h5>Style</h5>
        <h6>Colors</h6>
        <p>
          It is possible to change the colors of each single arc from the side
          menu
        </p>
      </div>
    </Card>
  )
}

export default Info
