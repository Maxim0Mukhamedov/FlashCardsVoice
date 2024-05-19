import React from "react";

import "../App.css";


export class AddFolder extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      folder: '',
    }
  }

  render () {
    const { onAdd } = this.props;

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onAdd(this.state.folder);
          this.setState({
            folder: '',
          })
        }}
      >
        <input
          className   = "add-folder"
          type        = "text"
          placeholder = "Add folder"
          value       = { this.state.folder }
          onChange    = {({ target: { value } }) => this.setState({
            folder: value,
          })}
          required
          autoFocus
        />
      </form>
    )
  }

}

