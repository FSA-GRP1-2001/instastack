import React, { Component } from 'react';
import { Button } from 'primereact/button';
class DragWrapper extends Component {
  state = {};

  drag = e => {
    // clone the item we are dragging
    const componentObj = JSON.parse(e.target.dataset.component);
    const tag = componentObj.htmlTag;
    let newComponent = document.createElement(tag);
    newComponent.className = componentObj.title;
    newComponent.id = e.target.id + `${Math.floor(Math.random() * 100)}`;
    console.log('tag is ', tag);
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
    if (tag === 'p') {
      newComponent.style.lineHeight = 'normal';
    }
    if (tag === 'button') {
      newComponent.style.minWidth = '80px';
      newComponent.style.width = '40%';
    }
    document.body.appendChild(newComponent);
    e.dataTransfer.setData('transfer', newComponent.id);
    // e.dataTransfer.setData('transfer', clone.id);
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
        onDragEnd={this.dragEnd}
        style={this.props.style}
        data-component={JSON.stringify(this.props.component)}
      >
        <div className="preview-button">{this.props.children}</div>
      </div>
    );
  }
}

export default DragWrapper;
