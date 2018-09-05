import React from 'react';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';

class OnSwipe extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      lastWheel: 0,
      wheelStart: 0,
      touchX: 0,
      touchY: 0,
      touchStartTime: 0,
    };
  }

  onWheel = (event) => {
    // const wheelCoodown = this.props.wheelCoodown || 1500;
    const lastWheel = Date.now();
    const diff = Math.abs(this.state.lastWheel - lastWheel);
    if (lastWheel - this.state.lastWheel > 1500) {
      this.setState({ wheelStart: lastWheel, lastWheel });
    } else {
      this.setState({ lastWheel });
    }
    console.log('wheel', event);

    console.log(lastWheel - this.state.wheelStart, diff);
    this.props.callback(); // eslint-disable-line
    const { deltaX, deltaY } = event;
    if (deltaY > 0) {
      this.onDown(event);
    } else if (deltaY < 0) {
      this.onUp(event);
    } else if (deltaX > 0) {
      this.onRight(event);
    } else if (deltaX < 0) {
      this.onLeft(event);
    } else {
      console.warn('unknown wheel event', event);
    }
  }

  onKeyDown = (event) => {
    console.log('keydown', event);
    switch (event.code) {
      case 'ArrowRight':
        this.onRight(event);
        break;
      case 'ArrowLeft':
        this.onLeft(event);
        break;
      case 'ArrowUp':
        this.onUp(event);
        break;
      case 'ArrowDown':
        this.onDown(event);
        break;
      default:
    }
  }

  onTouchEnd = (event) => {
    const minVelocity = 1;
    const { screenX, screenY } = event.changedTouches[0];
    const { touchX, touchY, touchStartTime } = this.state;
    const timeDelta = Date.now() - touchStartTime;

    const deltaX = screenX - touchX;
    const deltaY = screenY - touchY;
    const distance = Math.sqrt((Math.abs(deltaX) ** 2) + (Math.abs(deltaY) ** 2));
    const velocity = distance / timeDelta;
    console.log(deltaX, deltaY, velocity);
    if (velocity < minVelocity) {
      console.log('too slow', velocity);
    } else if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        this.onRight(event);
      } else {
        this.onLeft(event);
      }
    } else if (deltaY > 0) {
      this.onDown(event);
    } else {
      this.onUp(event);
    }
  }

  onTouchStart = (event) => {
    const { screenX, screenY } = event.changedTouches[0];
    this.setState({ touchX: screenX, touchY: screenY, touchStartTime: Date.now() });
  }

  onUp = (event) => {
    if (this.props.onUp) {
      this.props.onUp(event);
    }
  }

  onDown = (event) => {
    if (this.props.onDown) {
      this.props.onDown(event);
    }
  }

  onLeft = (event) => {
    if (this.props.onLeft) {
      this.props.onLeft(event);
    }
  }

  onRight = (event) => {
    if (this.props.onRight) {
      this.props.onRight(event);
    }
  }

  render() {
    const { children, ...params } = this.props;
    return (
      <EventListener target="window" onWheel={this.onWheel} onKeyDown={this.onKeyDown} onSwipe={this.onSwipe} onTouchEnd={this.onTouchEnd} onTouchStart={this.onTouchStart} {...params}>
        {children}
      </EventListener>
    );
  }
}

OnSwipe.propTypes = {
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  callback: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default OnSwipe;
