import React, { Component } from 'react';

class DropWrapper extends Component {
  state = {};

  drop = e => {
    e.preventDefault();
    const data = e.dataTransfer.getData('transfer');
    console.log('got data ', data);
    if (data && !e.target.classList.contains('react-grid-layout')) {
      e.target.appendChild(document.getElementById(data));
    }
  };

  allowDrop = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div
        id={this.props.id}
        onDrop={this.drop}
        onDragOver={this.allowDrop}
        style={this.props.style}
      >
        {this.props.children}
      </div>
    );
  }
}

export default DropWrapper;
