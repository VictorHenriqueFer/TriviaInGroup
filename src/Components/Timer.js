import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isTimeUp } from '../Redux/actions';

class Timer extends React.Component {
  state = {
    time: 30,
  };

  componentDidMount() {
    this.startTimer();
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
Timer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Timer);
