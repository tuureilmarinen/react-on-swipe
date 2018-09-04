# react-on-swipe

> A simple wrapper to catch onSwipe and onScroll events

[![NPM](https://img.shields.io/npm/v/react-on-swipe.svg)](https://www.npmjs.com/package/react-on-swipe) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-on-swipe
```

## Usage

```jsx
import React, { Component } from 'react'

import OnSwipe from 'react-on-swipe'

class Example extends Component {

  yourFunction (event) {
    console.log(`user swiped or scrolled to ${event.direction}`)
  }

  render () {
    return (
      <OnSwipe onSwipe={yourFunction} >
        <ThisCanHaveSomeChildElements />
        <YetAnotherChildElement />
      </OnSwipe>
    )
  }
}
```

## License

MIT © [tuureilmarinen](https://github.com/tuureilmarinen)
