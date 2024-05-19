import React from "react";

import "../App.css";


export class AddTask extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      note: {title: '', ans: ''},
    }
  }

  render () {
    const { onAdd } = this.props;

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onAdd(this.state.note);
          this.setState({
            note: {title: '', ans: ''},
          })
        }}
      >
        <input
          className   = "add-task"
          type        = "text"
          placeholder = "Add Note"
          value       = { this.state.note.title }
          onChange    = {({ target: { value } }) => this.setState({
            note: {...this.state.note,title: value},
          })}
          required
          autoFocus
        />
        <input
          className   = "add-task"
          type        = "text"
          placeholder = "Add ans"
          value       = { this.state.note.ans }
          onChange    = {({ target: { value } }) => this.setState({
            note: {...this.state.note,ans: value},
          })}
          required
          autoFocus
        />
        <input type ="submit"/>
      </form>
    )
  }

}

