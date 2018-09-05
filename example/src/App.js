import React, { Component } from 'react';

import OnSwipe from 'react-on-swipe';

export default class App extends Component {
  render () {
    return (
      <div>
        <OnSwipe callback={e => console.log(e)}>
          <h1>Swipe</h1>
        </OnSwipe>
      </div>
    );
  }
}
