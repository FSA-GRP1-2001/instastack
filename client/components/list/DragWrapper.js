import React, { Component } from 'react';

const tagMap = { '<p>': 'p', '<img>': 'img' };

class DragWrapper extends Component {
  state = {};

  drag = e => {
    // clone the item we are dragging
    const componentObj = JSON.parse(e.target.dataset.component);
    const tag = tagMap[componentObj.openTag];
    const newComponent = document.createElement(tag);
    if (tag === 'img') {
      newComponent.src = componentObj.src;
    }
    newComponent.id = e.target.id + `${Math.floor(Math.random() * 100)}`;
    newComponent.textContent = componentObj.body;
    document.body.appendChild(newComponent);
    e.dataTransfer.setData('transfer', newComponent.id);
    // // const clone = document.createElement(tag);
    // clone.id = e.target.id + 'clone';
    // clone.textContent = e.target.textContent;
    // document.body.appendChild(clone);
    console.log('the new component is ', newComponent);
    console.log('the data transfer obj is ', e.dataTransfer);
    // e.dataTransfer.setData('transfer', clone.id);
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
        data-component={JSON.stringify(this.props.component)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default DragWrapper;
