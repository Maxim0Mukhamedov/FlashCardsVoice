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
        className = "add-folder"
        onSubmit={(event) => {
          event.preventDefault();
          onAdd(this.state.folder);
          this.setState({
            folder: '',
          })
        }}
      >
      <button className = "sn-section-item add-folder-name">
        <input
          className   = "add-folder-name"
          type        = "text"
          placeholder = "Новая папка"
          value       = { this.state.folder }
          onChange    = {({ target: { value } }) => this.setState({
            folder: value,
          })}
          required
        />
      </button>
      </form>
    )
  }

}

