import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isTimeSeconds, isTimeUp } from '../Redux/actions';

class Timer extends React.Component {
  state = {
    time: 30,
  };

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate() {
    const { buttonSelect } = this.props;
    if (buttonSelect) {
      this.stopSeconds();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer = () => {
    const milissegundos = 1000;
    const { dispatch } = this.props;
    this.interval = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.time === 0) {
          this.stopTimer();
          dispatch(isTimeUp(true));
        }
        return { time: prevState.time - 1 };
      });
    }, milissegundos);
  };

  stopSeconds = () => {
    const { dispatch } = this.props;
    const { time } = this.state;
    dispatch(isTimeSeconds(time));
  };

  stopTimer = () => {
    clearInterval(this.interval);
  };

  render() {
    const { time } = this.state;
    const number = -1;

    return (
      <div>
        <h1>
          Timer:
          {' '}
          {time === number ? 0 : time}
        </h1>

      </div>

    );
  }
}
const mapStateToProps = (state) => ({
  time: state.timer.time,
  buttonSelect: state.timer.buttonSelect,
});

Timer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  buttonSelect: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Timer);
