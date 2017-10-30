import React from 'react';
import './intro.css';

class Intro extends React.Component {
  constructor() {
    super();
    this.state = {
      visibility: 'visible'
    };
  }

  render() {
    let visibility = this.state.visibility;
    let classes = `container ${visibility}`;

    return (
      <div className={classes}>
        <p className={this.state.visibility}>
          This is a two dimensional tribute to Dieter Rams, the creator of the Braun ET66 calculator.
          Inspired by the implementation of Apple.
        </p>
      </div>
    );
  }

  componentDidMount() {
    setInterval(() => this.setState({visibility: 'hidden'}), this.props.timeToTransition);
  }
}

export default Intro;
