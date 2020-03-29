/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropWrapper from './preview/DropWrapper';
import ContainerBox from './preview/Container';
import RGL, { WidthProvider } from 'react-grid-layout';
import Generic from './PreviewElements/Generic';
import { updateCode } from '../store';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import GridLayout from 'react-grid-layout';

class MyFirstGrid extends React.Component {
  render() {
    const layout = [
      //website for layouts https://strml.github.io/react-grid-layout/examples/0-showcase.html
      // { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
      // { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
      // { i: 'c', x: 4, y: 0, w: 1, h: 2 },
      { i: 'a', x: 0, y: 0, w: 6, h: 1 },
      { i: 'b', x: 0, y: 2, w: 6, h: 3 },
      { i: 'c', x: 0, y: 6, w: 1.5, h: 4 },
      { i: 'd', x: 2, y: 6, w: 1.5, h: 4 },
      { i: 'e', x: 4, y: 6, w: 1.5, h: 4 },
      // { i: 'f', x: 6, y: 6, w: 1.5, h: 4 },
      { i: 'g', x: 8, y: 6, w: 2, h: 5 },
      { i: 'h', x: 0, y: 14, w: 7, h: 3 },
      { i: 'i', x: 0, y: 27, w: 7, h: 4 },
      { i: 'j', x: 0, y: 31, w: 7, h: 16 },
      { i: 'k', x: 7, y: 11, w: 3, h: 9 },
      { i: 'l', x: 0, y: 47, w: 10, h: 3 },
      // { i: 'm', x: 4, y: 6, w: 1.5, h: 4 },

      // 0: [0, 0, 10, 2]
      // 1: [0, 2, 10, 4]
      // 2: [0, 6, 2, 5]
      // 3: [2, 6, 2, 5]
      // 4: [4, 6, 2, 5]
      // 5: [6, 6, 2, 5]
      // 6: [8, 6, 2, 5]
      // 7: [0, 11, 7, 3]
      // 8: [0, 14, 7, 13]
      // 9: [0, 27, 7, 4]
      // 10: [0, 31, 7, 16]
      // 11: [7, 11, 3, 9]
      // 12: [0, 47, 10, 3]
    ];
    return (
      <GridLayout
        className="layout"
        layout={layout}
        cols={16}
        rowHeight={30}
        width={1600}
      >
        <div key="a">nav bar</div>
        <div key="b">feature blog</div>
        <div key="c">blog post1</div>
        <div key="d">blog post1 image</div>
        <div key="e">blog post2</div>
        {/* <div key="f">blog post2 image</div> */}
        <div key="g">blog post3 header</div>
        <div key="h">blog post3</div>
        <div key="i">blog post4 header</div>
        <div key="j">blog post4</div>
        <div key="k">article links</div>
        <div key="l">footer</div>
      </GridLayout>
    );
  }
}

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
    this.addContainer = this.addContainer.bind(this);
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
    const ii = container.ii;
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

  addContainer() {
    const containerLen = this.state.containers.length;
    let nextIdx;
    if (containerLen < 1) {
      nextIdx = '0';
    } else {
      let lastIdx = this.state.containers[containerLen - 1].i;
      nextIdx = `${parseInt(lastIdx) + 1}`;
    }
    console.log('clicking add container button');
    const newItem = {
      i: nextIdx,
      x: 3,
      y: 2,
      w: 1,
      h: 2,
    };
    this.setState(prevState => {
      return { containers: [...prevState.containers, newItem] };
    });
  }

  render() {
    return (
      <div className="App" style={styles.gridContainer}>
        <DropWrapper>
          <MyFirstGrid
            rowHeight={60}
            width={1200}
            cols={12}
            onResize={this.onResize}
            layout={this.state.layout}
            onLayoutChange={this.onLayoutChange}
            draggableHandle=".MyDragHandleClassName"
            draggableCancel=".MyDragCancel"
          />
          {/* Above hard codes example dragable elements but we will ultimately get these from parts of our state */}
          {this.props.containers.map((item, idx) => {
            return this.createContainer(item);
            // <div
            //   className="MyDragHandleClassName"
            //   key={idx + 1}
            //   data-grid={item}
            // />
          })}
          <ReactGridLayout />
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
