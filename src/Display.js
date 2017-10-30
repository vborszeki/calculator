import React from 'react';
import './display.css';

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: 'normal',
      displayedValue: '0'
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    if(nextProps.value !== this.props.value) {
      this.setFontSize(nextProps);
      this.formatDisplayedValue(nextProps);
    }
  }

  render() {
    return (
      <textarea
        className={this.state.fontSize}
        placeholder="0"
        readOnly
        value={this.state.displayedValue}
      />
    );
  }

  shouldSetErrorMessage(value) {
    return value === Infinity || value === null;
  }

  setFontSize(nextProps) {
    const nextValue = nextProps.value;
    const nextValueLength = nextValue.toString().length;

    if (this.shouldSetErrorMessage(nextValue)) return;

    if (nextValueLength < 8 && nextValue.toString().includes('.')) {
      this.setState({fontSize: 'normal'});
    }

    if (nextValueLength > 7 && nextValueLength < 11  && nextValue.toString().includes('.')) {
      this.setState({fontSize: 'small'});
    }

    if (nextValueLength > 10  && nextValue.toString().includes('.')) {
      this.setState({fontSize: 'smallest'});
    }

    if (nextValueLength < 7 && !nextValue.toString().includes('.')) {
      this.setState({fontSize: 'normal'});
    }
    if (nextValueLength > 6 && nextValueLength < 11 && !nextValue.toString().includes('.')) {
      this.setState({fontSize: 'small'});
    }
    if (nextValueLength > 9 && !nextValue.toString().includes('.')) {
      this.setState({fontSize: 'smallest'});
    }
  }

  formatDisplayedValue(nextProps) {
    const nextValue = nextProps.value;
    const positiveValue = nextValue < 0 ? nextValue.toString().slice(1) : nextValue.toString();
    let displayedValue = positiveValue;

    if (displayedValue.includes('.')) {
      let [wholes, decimals] = displayedValue.split('.');

      if (wholes.length > 3) {
        wholes = wholes.slice(0, 10).trim();
        wholes = `${wholes.slice(-9, -6)} ${wholes.slice(-6, -3)} ${wholes.slice(-3)}`.trim();
        displayedValue = `${wholes.trim()}.${decimals}`;
      }
      displayedValue = displayedValue.slice(0, 11);
    }

    if (displayedValue.length > 3 && !displayedValue.includes('.')) {
      let slicedValue = displayedValue.slice(0, 9);
      displayedValue = `${slicedValue.slice(-9, -6)} ${slicedValue.slice(-6, -3)} ${slicedValue.slice(-3)}`.trim();
    }

    if (nextValue.toString().charAt(0) === '-') {
      displayedValue = '-' + displayedValue;
    }

    if (displayedValue.includes('.')) {
      displayedValue = displayedValue.toString().replace(/\./g, ',');
    }

    if (this.shouldSetErrorMessage(nextValue)) {
      displayedValue = 'Error';
    }

    this.setState({displayedValue: displayedValue});
  }
}

export default Display;
