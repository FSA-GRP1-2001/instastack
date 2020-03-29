import React, { Component } from 'react';

class DragWrapper extends Component {
  state = {};

  drag = e => {
    // clone the item we are dragging
    const componentObj = JSON.parse(e.target.dataset.component);
    console.log('dragged compObj is ', componentObj);
    const tag = componentObj.htmlTag;
    let newComponent = document.createElement(tag);
    newComponent.className = componentObj.title;
    newComponent.id = e.target.id + `${Math.floor(Math.random() * 100)}`;

    if (tag === 'ul') {
      let innerHtmlText = componentObj.children
        .map(str => '<li>' + str + '</li>')
        .join('');
      newComponent.innerHTML = innerHtmlText;
    } else if (tag === 'img') {
      newComponent.src = componentObj.src;
    } else {
      newComponent.textContent = componentObj.textContent;
    }
    document.body.appendChild(newComponent);
    e.dataTransfer.setData('transfer', newComponent.id);
    console.log('the new component is ', newComponent);
    console.log('the data transfer obj is ', e.dataTransfer);
    // e.dataTransfer.setData('transfer', clone.id);
    console.log('get data is ', e.dataTransfer.getData('transfer'));
  };

  nowAllowDrop = e => {
    e.stopPropagation();
  };

  dragEnd = e => {
    console.log('drag ended');
    if (e.dataTransfer.dropEffect === 'none') {
      // drag unsuccessful
      console.log('drag unsuccessful');
      // delete the extra node
      const recent = document.body.lastChild;
      const parent = recent.parentNode; // get its ID
      parent.removeChild(recent);
      // delete by ID
    }
  };

  render() {
    return (
      <div
        id={this.props.id}
        draggable="true"
        onDragStart={this.drag}
        onDragOver={this.nowAllowDrop}
        onDragEnd={this.dragEnd}
        style={this.props.style}
        data-component={JSON.stringify(this.props.component)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default DragWrapper;
