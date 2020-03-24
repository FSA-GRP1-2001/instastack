import React, { Component } from 'react';

class DragWrapper extends Component {
  state = {};

  drag = e => {
    console.log('the data transfer obj is ', e.dataTransfer);
    e.dataTransfer.setData('transfer', e.target.id);
    console.log('get data is ', e.dataTransfer.getData('transfer'));
  };

  nowAllowDrop = e => {
    e.stopPropagation();
  };

  render() {
    return (
      <div
        id={this.props.id}
        draggable="true"
        onDragStart={this.drag}
        onDragOver={this.nowAllowDrop}
        style={this.props.style}
      >
        {this.props.children}
      </div>
    );
  }
}

export default DragWrapper;
