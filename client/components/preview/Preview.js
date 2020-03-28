/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropWrapper from './DropWrapper';
import ContainerBox from './Container';
import RGL, { WidthProvider } from 'react-grid-layout';
import Generic from '../PreviewElements/Generic';
import {
  updateCode,
  saveContainers,
  removeContainer,
  openedSideBar,
} from '../../store';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import usedComponents from '../../store/usedComponents';
import SideBar from './SideBar';

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
      layout: this.props.containers,
      resizeplotly: false,
      code: '',
    };
    this.setDroppedElement = this.setDroppedElement.bind(this);
    this.createContainer = this.createContainer.bind(this);
    this.removeContainer = this.removeContainer.bind(this);
    this.handleLayoutChange = this.handleLayoutChange.bind(this);
    this.handleOpenEditMenu = this.handleOpenEditMenu.bind(this);
  }

  componentDidMount() {
    console.log('loading Preview area');
    if (this.props.usedContainers.length > 0) {
      console.log('loading used components');
      populateSavedComponents(this.props.usedComponents);
    }
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
    this.props.openSideBar(id, title);
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

  render() {
    return (
      <div className="App" style={styles.gridContainer}>
        <SideBar />
        <DropWrapper>
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCode: code => dispatch(updateCode(code)),
    saveContainers: containers => dispatch(saveContainers(containers)),
    removeContainer: containerId => dispatch(removeContainer(containerId)),
    openSideBar: (compId, compType) =>
      dispatch(openedSideBar(compId, compType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
