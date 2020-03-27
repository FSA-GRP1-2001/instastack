/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropWrapper from './DropWrapper';
import ContainerBox from './Container';
import RGL, { WidthProvider } from 'react-grid-layout';
import Generic from '../PreviewElements/Generic';
import { updateCode } from '../../store';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ReactGridLayout = WidthProvider(RGL);
const isEmpty = obj => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

// item and MyDrageHandleClassName in css file
const styles = {
  gridContainer: {
    border: '1px solid black',
    minHeight: '800px',
    maxHeight: '800px',
  },
  outerContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 4fr',
    border: '1px solid black',
  },
};

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: [...this.props.containers],
      resizeplotly: false,
      code: '',
    };
    this.setDroppedElement = this.setDroppedElement.bind(this);
    this.createContainer = this.createContainer.bind(this);
    this.removeContainer = this.removeContainer.bind(this);
  }

  removeContainer() {
    console.log('clicked remove container button');
  }

  createContainer(container) {
    const removeIcon = {
      position: 'absolute',
      left: '1px',
      cursor: 'pointer',
    };
    const editIcon = {
      position: 'absolute',
      right: '1px',
      cursor: 'pointer',
    };
    const i = container.i;
    return (
      <div
        style={{
          border: '1px solid yellow',
          overflow: 'auto',
          paddingLeft: 10,
          paddingRight: 10,
        }}
        key={i}
        data-grid={container}
        id={i}
        className="MyDragHandleClassName"
      >
        <span
          style={removeIcon}
          onClick={this.removeContainer}
          className="remove pi pi-trash"
        />
        <span
          style={editIcon}
          onClick={this.removeContainer}
          className="remove pi pi-pencil"
        />
      </div>
    );
  }

  parseComponent(obj) {
    const open = obj.openTag;
    const close = obj.closeTag;
    const textContent = obj.textContent || '';
    return `${open}${textContent}${close}`;
  }

  getCodedElements() {
    const keys = Object.keys(this.state);
    const arr = [];
    keys.forEach(k => {
      if (!isEmpty(this.state[k])) arr.push(this.state[k]);
    });
    return arr;
  }

  setDroppedElement(el, boxKey) {
    this.setState({
      [boxKey]: el,
    });
    const codeArr = this.getCodedElements();
    const parsedCode = codeArr.map(c => this.parseComponent(c)).join('\n');
    console.log(parsedCode);
    this.props.updateCode(parsedCode);
  }

  render() {
    return (
      <div className="App" style={styles.gridContainer}>
        <DropWrapper>
          <ReactGridLayout
            rowHeight={60}
            width={1200}
            cols={12}
            onResize={this.onResize}
            layout={this.state.layout}
            onLayoutChange={this.onLayoutChange}
            draggableHandle=".MyDragHandleClassName"
            draggableCancel=".MyDragCancel"
          >
            {/* ABove hard codes example dragable elements but we will ultimately get these from parts of our state */}
            {this.props.containers.map((item, idx) => {
              return this.createContainer(item);
              // <div
              //   className="MyDragHandleClassName"
              //   key={idx + 1}
              //   data-grid={item}
              // />
            })}
          </ReactGridLayout>
        </DropWrapper>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCode: code => dispatch(updateCode(code)),
  };
};

export default connect(null, mapDispatchToProps)(Preview);
