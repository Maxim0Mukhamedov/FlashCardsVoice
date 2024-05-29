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
          <div className = "card-play-container">
      <p className = "card-number">Вопрос {this.state.index + 1}</p>
      <div className="card">
        <div className="card-inner">
          <div className="card-front">
            <summary className="question">{items[this.state.index].title}</summary>
          </div>
          <div className="card-back">
            <p className="answer">{items[this.state.index].ans}</p>
          </div>
        </div>
      </div>
      <div className="arrows">
        <button className="arrow">
                    <svg xmlns="http://www.w3.org/2000/svg">
              <path d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z" data-name="Left"/>
            </svg>
            <input
              id = "left-arrow"
              type      = "button"
              value     = "<-"
              onClick  = {this.prevQ}
            />

        </button>
        <button className="arrow">
                    <svg xmlns="http://www.w3.org/2000/svg">
              <path d="m31.71 15.29-10-10-1.42 1.42 8.3 8.29H0v2h28.59l-8.29 8.29 1.41 1.41 10-10a1 1 0 0 0 0-1.41z" data-name="Right"/>
            </svg>
          <input
            id = "right-arrow"
            type      = "button"
            value     = "->"
            onClick  = {this.nextQ}
            />

        </button>
      </div>
    </div>
    );
  }
}
