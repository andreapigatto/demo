import { useState, useEffect, useRef, ChangeEvent } from 'react'

import classes from './Slider.module.scss'

type ComponentProps = {
  range: { minValue: number; maxValue: number }
  value: number
  intervalStepAnimation: number
  changed: (newValue: number) => void
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Slider = ({
  range,
  value,
  intervalStepAnimation,
  changed,
}: ComponentProps): JSX.Element => {
  const [buttonState, setButtonState] = useState(false)
  const intervalId = useRef<number>()

  const setIntervalFunc = () => changed(value + 1)

  useEffect(() => {
    if (buttonState) {
      if (value < range.maxValue) {
        intervalId.current = window.setInterval(
          setIntervalFunc,
          intervalStepAnimation
        )
      } else {
        setButtonState(false)
      }
    }
    return () => clearInterval(intervalId.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonState, value])

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    changed(+event.target.value)
  }

  const onClickButtonHandler = () => {
    if (value === range.maxValue) {
      changed(range.minValue)
    }
    setButtonState((flag) => !flag)
  }

  return (
    <form className={classes.Form}>
      <label htmlFor="vol">Year:</label>
      <input
        type="range"
        id="vol"
        name="vol"
        value={value}
        min={range.minValue}
        max={range.maxValue}
        onChange={onChangeHandler}
        step="1"
      />
      <button onClick={onClickButtonHandler} type="button">
        {!buttonState ? 'START' : 'STOP'}
      </button>
      <div>{value}</div>
    </form>
  )
}

export default Slider
