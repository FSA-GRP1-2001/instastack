import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCode, addComponent } from '../../store';

class DropWrapper extends Component {
  constructor(props) {
    super(props);
  }

  getPreviewHtml() {
    const grid = document.querySelector('.react-grid-layout');
    const html = grid.innerHTML;
    return html;
  }

  drop = e => {
    e.preventDefault();
    const containerIdx = e.target.id;
    const data = e.dataTransfer.getData('transfer');
    const component = document.getElementById(data);
    console.log('dropping the component ', component);
    let children = null;
    if (component.children.length) {
      children = [...component.children].map(c => ({
        tag: c.tagName,
        content: c.textContent,
      }));
    }
    const componentObj = {
      domId: data,
      tag: component.tagName,
      content: component.textContent,
      src: component.src || '',
      children: children,
    };
    console.log('componentObj is ', componentObj);
    // Add dropped component as obj in redux
    this.props.addComponent(componentObj, containerIdx);
    if (data && !e.target.classList.contains('react-grid-layout')) {
      e.target.appendChild(document.getElementById(data));
      this.props.updateCode(this.getPreviewHtml());
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

const mapDispatchToProps = dispatch => {
  return {
    updateCode: code => dispatch(updateCode(code)),
    addComponent: (componentObj, containerIdx) =>
      dispatch(addComponent(componentObj, containerIdx)),
  };
};

export default connect(null, mapDispatchToProps)(DropWrapper);
