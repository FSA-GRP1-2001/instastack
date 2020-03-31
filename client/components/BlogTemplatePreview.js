/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropWrapper, { getPreviewHtml } from './preview/DropWrapper';
import RGL, { WidthProvider } from 'react-grid-layout';
import {
  updateCode,
  saveContainers,
  removeContainer,
  openedSideBar,
} from '../store';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import SideBar from './preview/SideBar';
import GridLayout from 'react-grid-layout';

class MyFirstGrid extends React.Component {
  render() {
    const layout = [
      //website for layouts https://strml.github.io/react-grid-layout/examples/0-showcase.html
      { i: 'a', x: 0, y: 0, w: 5, h: 1 },
      { i: 'b', x: 0, y: 2, w: 5, h: 3 },
      { i: 'c', x: 0, y: 6, w: 1, h: 4 },
      { i: 'd', x: 2, y: 6, w: 1, h: 4 },
      { i: 'e', x: 4, y: 6, w: 1, h: 4 },
      // { i: 'f', x: 6, y: 6, w: 1.5, h: 4 },
      { i: 'g', x: 0, y: 14, w: 5, h: 2 },
      { i: 'h', x: 0, y: 14, w: 5, h: 3 },
      { i: 'i', x: 0, y: 27, w: 5, h: 4 },
      { i: 'j', x: 0, y: 31, w: 5, h: 8 },
      // { i: 'k', x: 7, y: 11, w: 3, h: 9 },
      // { i: 'l', x: 0, y: 47, w: 10, h: 3 },
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
        {/* <div key="k">article links</div> */}
        {/* <div key="l">footer</div> */}
        {/* </div> */}
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

const populateSavedComponents = arr => {
  const grid = document.querySelector('.react-grid-layout');

  arr.map(obj => {
    const { component, i } = obj;
    console.log(component, i);
    let node = document.createElement(component.tag);
    node.textContent = component.content;
    if (component.tag.toLowerCase() === 'img') {
      node.src = component.src;
    }
    node.id = component.domId;
    let container = grid.querySelector(`#\\3${i}`);
    container.appendChild(node);
  });
};

// item and MyDragHandleClassName in css file
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

class BlogTemplatePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: this.props.containers,
      resizeplotly: false,
      code: '',
    };
    this.setDroppedElement = this.setDroppedElement.bind(this);
    this.createContainer = this.createContainer.bind(this);
    this.removeContainer = this.removeContainer.bind(this);
    this.handleLayoutChange = this.handleLayoutChange.bind(this);
    this.handleOpenEditMenu = this.handleOpenEditMenu.bind(this);
    this.addContainer = this.addContainer.bind(this);
  }

  componentDidMount() {
    console.log('loading Preview area');
    if (this.props.usedContainers.length > 0) {
      console.log('loading used components');
      populateSavedComponents(this.props.usedComponents);
    }
    if (this.props.usedStyles.length > 0) {
      console.log('loading saved styles!');
      this.props.usedStyles.forEach(styleObj => {
        let node = document.getElementById(styleObj.domId);
        // const styles = styleObj.styles;
        if (styleObj.styles.fontSize.length)
          node.style.fontSize = styles.fontSize + 'px';
        if (styleObj.styles.color.length) node.style.color = styles.color;
        if (styleObj.styles.borderStyle.length)
          node.style.borderStyle = styles.borderStyle;
        if (styleObj.styles.borderWidth.length)
          node.style.borderWidth = styles.borderWidth;
        if (styleObj.styles.borderRadius.length)
          node.style.borderRadius = styles.borderRadius + 'px';
        if (styleObj.styles.padding.length)
          node.style.padding = styles.padding + 'px';
        if (styleObj.styles.backgroundColor.length)
          node.style.backgroundColor = '#' + styles.backgroundColor;
      });
    }
    this.props.updateCode(getPreviewHtml());
  }
  handleLayoutChange(layouts) {
    console.log('layout change', layouts);
    this.props.saveContainers(layouts);
  }

  removeContainer(containerId) {
    this.props.removeContainer(containerId);
  }
  handleOpenEditMenu(i) {
    const componentObj = this.props.usedComponents.filter(comp => {
      return comp.i === i;
    })[0];
    const title = componentObj.component.title;
    const id = componentObj.component.domId;
    console.log('handle open menu component is ', componentObj, title, id);
    this.props.openSideBar(id, title, i);
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
          onClick={() => this.removeContainer(container.i)}
          className="remove pi pi-trash"
        />
        <span
          style={editIcon}
          onClick={() => this.handleOpenEditMenu(container.i)}
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
        <SideBar />
        <DropWrapper>
          <MyFirstGrid />

          <ReactGridLayout
            rowHeight={60}
            width={1200}
            cols={12}
            layout={this.props.usedContainers}
            onLayoutChange={layout => this.handleLayoutChange(layout)}
            draggableHandle=".MyDragHandleClassName"
            draggableCancel=".MyDragCancel"
          >
            {/* ABove hard codes example dragable elements but we will ultimately get these from parts of our state */}
            {this.props.usedContainers.length
              ? this.props.usedContainers.map(item => {
                  return this.createContainer(item);
                  // <div
                  //   className="MyDragHandleClassName"
                  //   key={idx + 1}
                  //   data-grid={item}
                  // />
                })
              : null}
          </ReactGridLayout>
        </DropWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    usedContainers: state.containers,
    usedComponents: state.usedComponents,
    usedStyles: state.usedStyles,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCode: code => dispatch(updateCode(code)),
    saveContainers: containers => dispatch(saveContainers(containers)),
    removeContainer: containerId => dispatch(removeContainer(containerId)),
    openSideBar: (compId, compType, i) =>
      dispatch(openedSideBar(compId, compType, i)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogTemplatePreview);
