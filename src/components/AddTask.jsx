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
      <form class="add-tasks"
        onSubmit={(event) => {
          event.preventDefault();
          onAdd(this.state.note);
          this.setState({
            note: {title: '', ans: ''},
          })
        }}
      >
        <input
          id = "addQ"
          className   = "sn-section-item add-question"
          type        = "text"
          placeholder = "Вопрос"
          value       = { this.state.note.title }
          onChange    = {({ target: { value } }) => this.setState({
            note: {...this.state.note,title: value},
          })}
          required
          autoFocus
        />
        <input
          className   = "sn-section-item add-answer"
          type        = "text"
          placeholder = "Ответ"
          value       = { this.state.note.ans }
          onChange    = {({ target: { value } }) => this.setState({
            note: {...this.state.note,ans: value},
          })}
          required
          autoFocus
        />
        <input value = "Сохранить" className = "sn-section-item submit-question" type ="submit"/>
      </form>
    )
  }

}

