import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: null,
      elapsed: 0
    };

    this.getTime = this.getTime.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    let timer = setInterval(this.tick, 100);
    this.setState({ timer });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  tick() {
    if (!this.props.board.boardSolved()) {
      this.setState({elapsed: new Date() - this.props.start});
    } else {
      this.props.setTime(this.getTime());
    }
  }

  getTime() {
    let elapsed = Math.round(this.state.elapsed / 100);
    let totalSeconds = elapsed / 10;
    let seconds = (totalSeconds % 60).toFixed(1);
    if (seconds.length < 4) { seconds = "0" + seconds; }
    let minutes = Math.floor(totalSeconds / 60);
    return `${minutes}:${seconds}`;
  }

  render() {
    let elapsedTime = this.getTime();
    return (
      <div className="timer">
        { elapsedTime }
      </div>
    );
  }
}

export default Timer;
