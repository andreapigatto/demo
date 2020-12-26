// CSS styles
import classes from './Spinner.module.scss'

type ComponentProps = {
  msg: string
}

// Main logic is defined in related CSS.
const Spinner = ({ msg }: ComponentProps) => (
  <div className={classes.Container}>
    <div className={classes.SkChase}>
      <div className={classes.SkChaseDot} />
      <div className={classes.SkChaseDot} />
      <div className={classes.SkChaseDot} />
      <div className={classes.SkChaseDot} />
      <div className={classes.SkChaseDot} />
      <div className={classes.SkChaseDot} />
    </div>
    <p>{msg}</p>
  </div>
)

export default Spinner
