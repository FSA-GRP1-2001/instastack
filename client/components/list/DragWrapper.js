import React, { Component } from 'react';

class DragWrapper extends Component {
  state = {};

  drag = e => {
    console.log('target is ', e.target);
    // clone the item we are dragging
    const tag = e.target.tagName;
    const clone = document.createElement(tag);
    clone.id = e.target.id + 'clone';
    clone.textContent = e.target.textContent;
    document.body.appendChild(clone);
    console.log('the clone is ', clone, 'document is ', document);
    console.log('the data transfer obj is ', e.dataTransfer);
    e.dataTransfer.setData('transfer', clone.id);
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
