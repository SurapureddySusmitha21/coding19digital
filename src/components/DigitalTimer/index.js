// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}
class DigitalTimer extends Component {
  state = initialState

  clearTimerInterval = () => clearInterval(this.intervalId)

  onRestartTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state
    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  incrementTimeElapsedInSeconds = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60
    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60
    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringfiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringfiedSeconds}`
  }

  render() {
    const {
      isTimerRunning,
      timerLimitInMinutes,
      timeElapsedInSeconds,
    } = this.state
    const isButtonsDisabled = timeElapsedInSeconds > 0
    const btns = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png '

    const altA = isTimerRunning ? 'pause icon' : 'play icon'

    const startAndPuseText = isTimerRunning ? 'Paused' : 'Start'
    return (
      <div className="container">
        <div className="bg-container">
          <div className="heading-container">
            <h1 className="digital-heading">Digital Timer</h1>
          </div>
          <div className="img-and-btn-container">
            <div className="image-container">
              <div className="paragraph-container">
                <h1 className="elapsed-time">
                  {this.getElapsedSecondsInTimeFormat()}
                </h1>
                <p className="time-paragraph">
                  {isTimerRunning ? 'Running' : 'Paused'}
                </p>
              </div>
            </div>
            <div className="btn-container">
              <div className="start-and-restart-btn">
                <div className="start-btn">
                  <button
                    className="button"
                    type="button"
                    onClick={this.onStartOrPauseTimer}
                  >
                    <img src={btns} alt={altA} className="image-url" />

                    <p className="paragraph">{startAndPuseText}</p>
                  </button>
                </div>
                <div className="pause-container">
                  <button
                    className="button"
                    type="button"
                    onClick={this.onRestartTimer}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      alt="reset icon"
                      className="image-url"
                    />
                  </button>
                  <p className="paragraph">Restart</p>
                </div>
              </div>
              <div className="set-timer-container">
                <p className="set-timer-paragraph">Set Timer Limit</p>
                <div className="increse-and-decrease-container">
                  <button
                    className="plus-btn"
                    type="button"
                    disabled={isButtonsDisabled}
                    onClick={this.onDecreaseTimerLimitInMinutes}
                  >
                    -
                  </button>
                  <div className="number-container">
                    <p className="num-paragraph">{timerLimitInMinutes}</p>
                  </div>
                  <button
                    className="plus-btn"
                    type="button"
                    disabled={isButtonsDisabled}
                    onClick={this.onIncreaseTimerLimitInMinutes}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
