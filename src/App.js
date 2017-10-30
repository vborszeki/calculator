import React from 'react';
import './app.css';
import Intro from './Intro.js';
import Calculator from './Calculator.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      timeToReadIntro: 8000
    };
  }

  render() {
    return (
      <div className="container">
        <Intro timeToTransition={this.state.timeToReadIntro} />
        <Calculator timeToTransition={this.state.timeToReadIntro} />
      </div>
    );
  }
}

export default App;
