import React from "react";
import { useSpatnavInitialization, useSection } from '@salutejs/spatial';
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
        className = "folder-add-form"
        onSubmit={(event) => {
          event.preventDefault();
          onAdd(this.state.folder);
          this.setState({
            folder: '',
          })
        }}
      >
        <input
          className   = "sn-section-item add-folder"
          type        = "text"
          placeholder = "Название папки"
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

