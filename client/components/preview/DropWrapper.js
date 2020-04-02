/* eslint-disable complexity */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCode, addComponent, resizedContainer } from '../../store';

export const getPreviewHtml = () => {
  const grid = document.querySelector('.react-grid-layout');
  const html = grid.innerHTML;
  return html;
};

class DropWrapper extends Component {
  constructor(props) {
    super(props);
    this.handleResizeContainer = this.handleResizeContainer.bind(this);
  }

  handleResizeContainer = (containerId, tagName) => {
    let container = this.props.usedContainers.filter(
      c => c.i === containerId
    )[0];
    let w = container.w;
    let h = container.h;
    console.log('the tagname is ', tagName);
    if (tagName === 'H1' && container.x - 5 <= 7 && container.w < 5) {
      w = 5;
    }
    if (
      tagName === 'IMG' &&
      ((container.x - 4 <= 8 && container.w <= 4) ||
        (container.y - 3 <= 9 && container.h < 2))
    ) {
      w = 4;
      h = 3;
    }
    if (tagName === 'P' && (container.h < 4 || container.w < 4)) {
      console.log('updating p container size');
      w = 4;
      h = 4;
    }
    container = { ...container, w, h };
    this.props.resizedContainer(container);
  };

  drop = e => {
    e.preventDefault();
    const containerIdx = e.target.id;
    const data = e.dataTransfer.getData('transfer');
    const component = document.getElementById(data);
    // const prevCompData = JSON.parse(component.dataset.component)
    console.log(
      'dropping the component ',
      component,
      ' width is ',
      component.offsetWidth,
      ' on container ',
      containerIdx
    );

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
      title: component.className,
      // dataGrid: component.dataset.component,
      content: component.textContent,
      src: component.src || '',
      children: children,
    };
    console.log('componentObj is ', componentObj);
    // Add dropped component as obj in redux
    this.props.addComponent(componentObj, containerIdx);
    if (data && !e.target.classList.contains('react-grid-layout')) {
      e.target.appendChild(document.getElementById(data));
      this.props.updateCode(getPreviewHtml());
      this.handleResizeContainer(containerIdx, component.tagName);
    } else {
      const recent = document.body.lastChild;
      const parent = recent.parentNode; // get its ID
      parent.removeChild(recent); // delete by ID
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

const mapStateToProps = state => {
  return {
    usedContainers: state.containers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCode: code => dispatch(updateCode(code)),
    addComponent: (componentObj, containerIdx) =>
      dispatch(addComponent(componentObj, containerIdx)),
    resizedContainer: container => dispatch(resizedContainer(container)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DropWrapper);
