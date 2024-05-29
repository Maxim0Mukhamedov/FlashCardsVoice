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
          className   = "add-question"
          type        = "text"
          placeholder = "Введите вопрос"
          value       = { this.state.note.title }
          onChange    = {({ target: { value } }) => this.setState({
            note: {...this.state.note,title: value},
          })}
          required
          autoFocus
        />
        <input
          className   = "add-answer"
          type        = "text"
          placeholder = "Введите ответ"
          value       = { this.state.note.ans }
          onChange    = {({ target: { value } }) => this.setState({
            note: {...this.state.note,ans: value},
          })}
          required
          autoFocus
        />
        <input value = "Сохранить" className = "submit-question" type ="submit"/>
      </form>
    )
  }

}

