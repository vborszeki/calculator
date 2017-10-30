import React from 'react';
import Button from './Button.js';
import Display from './Display.js'
import './calculator.css';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      value: '0',
      visibility: 'hidden',
      clear: 'AC',
      operator: '',
      lastInput: '',
      clickedOperator: false
    };
  }

  handleClick(e) {
    if (this.isOperator(e.target.value)) {
      this.storeOperator(e);
    }

    if (this.isNumeric(e.target.value)) {
      this.storeValue(e);
    }

    if (e.target.value.includes('C')) {
      this.clearDisplay();
    }

    if (e.target.value === '+/-') {
      this.invertSign();
    }

    if (e.target.value === '%') {
      this.calculatePercentage();
    }

    if (e.target.value === '=' || (this.isOperator(e.target.value) && this.state.lastInput !== '')) {
      this.calculateValue(e);
    }
  }

  render() {
    let visibility = this.state.visibility;
    let classes = `calculator ${visibility}`;

    return (
      <div className={classes}>
        <Display value={this.state.lastInput === '' ? this.state.value : this.state.lastInput}/>
        <div className="buttons">
          <Button name="clear" handleClick={this.handleClick}>{this.state.clear}</Button>
          <Button name="invert" handleClick={this.handleClick}>+/-</Button>
          <Button name="percent" handleClick={this.handleClick}>%</Button>
          <Button name="divide" handleClick={this.handleClick} clickedOperator={this.state.clickedOperator && this.state.operator === '÷' ? true : false}>÷</Button>
          <Button name="seven" handleClick={this.handleClick}>7</Button>
          <Button name="eight" handleClick={this.handleClick}>8</Button>
          <Button name="nine" handleClick={this.handleClick}>9</Button>
          <Button name="multiply" handleClick={this.handleClick} clickedOperator={this.state.clickedOperator && this.state.operator === '×' ? true : false}>×</Button>
          <Button name="four" handleClick={this.handleClick}>4</Button>
          <Button name="five" handleClick={this.handleClick}>5</Button>
          <Button name="six" handleClick={this.handleClick}>6</Button>
          <Button name="subtract" handleClick={this.handleClick} clickedOperator={this.state.clickedOperator && this.state.operator === '-' ? true : false}>-</Button>
          <Button name="one" handleClick={this.handleClick}>1</Button>
          <Button name="two" handleClick={this.handleClick}>2</Button>
          <Button name="three" handleClick={this.handleClick}>3</Button>
          <Button name="add" handleClick={this.handleClick} clickedOperator={this.state.clickedOperator && this.state.operator === '+' ? true : false}>+</Button>
          <Button name="zero" handleClick={this.handleClick}>0</Button>
          <Button name="decimal" handleClick={this.handleClick}>,</Button>
          <Button name="equal" handleClick={this.handleClick}>=</Button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    setInterval(() => this.setState({visibility: 'visible'}), this.props.timeToTransition);
  }

  calculateValue(e) {
    if (this.state.value === '0' || this.state.operator === '') return;
    let value;
    if (this.state.operator === '+') {
      value = Number(this.state.value) + Number(this.state.lastInput);
    }
    if (this.state.operator === '-') {
      value = Number(this.state.value) - Number(this.state.lastInput);
    }
    if (this.state.operator === '×') {
      value = Number(this.state.value) * Number(this.state.lastInput);
    }
    if (this.state.operator === '÷') {
      value = Number(this.state.value) / Number(this.state.lastInput);
    }

    this.setState({
      value: value,
      lastInput: '',
      operator: this.isOperator(e.target.value) ? e.target.value : ''
    });
  }

  storeValue(e) {
    const prevValue = this.state.value;
    const nextValue = e.target.value.includes(',') ? e.target.value.replace(/,/g, '.') : e.target.value;
    const lastInput = this.state.lastInput;
    const operator = this.state.operator;

    if (lastInput === '' && operator === '') {
      if (prevValue.includes('.') && e.target.value === ',') return;
      let value = `${prevValue}${nextValue}`.toString();
      value = value[0] === '0' ? value.slice(1) : value;
      value = value[0] === '.' ? `0${value}` : value;
      this.setState({value: value, clear: value === '0' ? 'AC' : 'C', clickedOperator: false});
    }

    if (operator !== '') {
      if (lastInput.includes('.') && e.target.value === ',') return;
      let value = `${lastInput}${nextValue}`.toString();
      value = value[0] === '0' && value.length > 1 ? value.slice(1) : value;
      value = value[0] === '.' ? `0${value}` : value;
      this.setState({lastInput: value, clickedOperator: false});
    }
  }

  isNumeric(value) {
    const numericVals = [',', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    return numericVals.includes(value);
  }

  isOperator(value) {
    return ['÷', '×', '-', '+'].includes(value);
  }

  clearDisplay() {
    this.setState({value: '0', clear: 'AC', lastInput: '', operator: ''});
  }

  invertSign() {
    const prevValue = this.state.value;

    const invertedValue = prevValue.toString().charAt(0) !== '-'
      ? Number(`-${prevValue}`)
      : prevValue * -1;

    this.setState({value: invertedValue});
  }

  calculatePercentage() {
    this.setState({value: this.state.value / 100});
  }

  storeOperator(e) {
    this.setState({
      operator: e.target.value,
      clickedOperator: true
    });
  }
}

export default Calculator;
