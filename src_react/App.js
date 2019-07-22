import React, {Component} from 'react'

/*
应用根组件
 */
export default class App extends Component {
  state={
    count:0
  }
  increment=()=>{
    const number=this.refs.numberSelect.value*1
    const {count}=this.state
    this.setState({
      count:count+number
    })
  }
  decrement=()=>{
    const number=this.refs.numberSelect.value*1
    const {count}=this.state
    this.setState({
      count:count-number
    })
  }
  incrementIfOdd=()=>{
    const number=this.refs.numberSelect.value*1
    const {count}=this.state
    if(count%2===1){
      this.setState({
        count:count+number
      })
    }
  }
  incrementAsync=()=>{
    setTimeout(()=>{
      const number=this.refs.numberSelect.value*1
      const {count}=this.state
      this.setState({
        count:count+number
      })
    },1000)
  }
  render() {
    const count=this.state.count
    return (
      <div>
        <p>点击{count}次</p>
        <select ref="numberSelect">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;
        <button onClick={this.incrementAsync}>increment async</button>
      </div>
    )
  }
}


