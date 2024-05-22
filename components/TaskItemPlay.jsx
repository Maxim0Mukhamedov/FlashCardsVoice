import React from "react";

import {TaskItem} from './TaskItem';
import "../App.css";


export class TaskItemPlay extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
      index: 0,
      size: 0,
    }
  }

  nextQ = () => {
    this.setState({index: (this.state.index + 1) >= this.state.size ? this.state.size - 1 : this.state.index + 1});
  }

  prevQ = () => {
  	this.setState({index: (this.state.index - 1) < 0 ? 0 : this.state.index - 1})
  }

  render () {
  	const { items, onDone } = this.props;
  	this.state.size = items.length;
  	return (
    <>
    <p className = "card-number">Вопрос №{this.state.index + 1}</p>
    <details className = "card">
    	<summary className = "question">{items[this.state.index].title}</summary>
        <p className = "answer">{items[this.state.index].ans}</p>
    </details> 

    <input
        className = "arrow"
        type      = "button"
        value     = "<-"
        onClick  = {this.prevQ}
        />
    <input
        className = "arrow"
        type      = "button"
        value     = "->"
        onClick  = {this.nextQ}
        />
      </>
      )
  }
}
