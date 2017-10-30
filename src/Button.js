import React from 'react';
import './button.css';

class Button extends React.Component {
  render() {
    let clicked = this.props.clickedOperator;
    let classes = clicked ? `${this.props.name} clickedOperator` : this.props.name;
    return (
      <button
        className={classes}
        value={this.props.children}
        onClick={this.props.handleClick}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
