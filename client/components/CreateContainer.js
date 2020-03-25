import React, { Component } from 'react';

export default class CreateContainer extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.addContainer();
  }

  render() {
    return (
      <div className="button-bar-container">
        <button onClick={this.handleClick}> Add Container </button>

        <button>Other Buttons</button>
        <button>Other Buttons</button>
      </div>
    );
  }
}
