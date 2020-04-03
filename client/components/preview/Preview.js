/* eslint-disable complexity */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropWrapper, { getPreviewHtml } from './DropWrapper';
import RGL, { WidthProvider } from 'react-grid-layout';
import {
  updateCode,
  saveContainers,
  removeContainer,
  openedSideBar,
} from '../../store';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import SideBarParent from './SideBarParent';

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
    if (component.tag.toLowerCase() === 'ul') {
      let htmlText = component.children
        .map(child => {
          return '<li>' + child.content + '</li>';
        })
        .join('');
      node.innerHTML = htmlText;
    }
    node.id = component.domId;
    let container = grid.querySelector(`#\\3${i}`);
    if (container) container.appendChild(node);
  });
};

// item and MyDragHandleClassName in css file
const styles = {
  gridContainer: {
    minHeight: '800px',
    maxHeight: '800px',
    margin: '0.7rem',
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
    if (this.props.usedStyles.length > 0) {
      console.log('loading saved styles!');
      this.props.usedStyles.forEach(styleObj => {
        let node = document.getElementById(styleObj.domId);
        const styles = styleObj.styles;
        if (styleObj.styles.fontSize)
          node.style.fontSize = styles.fontSize + 'px';
        if (styleObj.styles.color) node.style.color = styles.color;
        if (styleObj.styles.borderStyle)
          node.style.borderStyle = styles.borderStyle;
        if (styleObj.styles.borderWidth)
          node.style.borderWidth = styles.borderWidth;
        if (styleObj.styles.borderRadius)
          node.style.borderRadius = styles.borderRadius + 'px';
        if (styleObj.styles.padding) node.style.padding = styles.padding + 'px';
        if (styleObj.styles.backgroundColor)
          node.style.backgroundColor = styles.backgroundColor;
        if (styleObj.styles.src) node.src = styles.src;
        if (styleObj.styles.imageWidth) node.style.width = styles.imageWidth;
        if (styleObj.styles.alignSelf) node.style.alignSelf = styles.alignSelf;
        console.log('styled node is ', node);
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
    if (!this.props.usedComponents.length) return;
    const componentObjArr = this.props.usedComponents
      .filter(comp => {
        return comp.i === i;
      })
      .map(comp => ({
        domId: comp.component.domId,
        title: comp.component.title,
        i: i,
      }));
    this.props.openSideBar(componentObjArr);
  }
  createContainer(container) {
    const removeIcon = {
      position: 'absolute',
      left: '3px',
      cursor: 'pointer',
      fontSize: '2em',
    };
    const editIcon = {
      position: 'absolute',
      right: '5px',
      cursor: 'pointer',
      fontSize: '2.5em',
    };
    const i = container.i;
    return (
      <div
        style={{
          overflow: 'auto',
          paddingLeft: 10,
          paddingRight: 10,
          display: 'flex',
          flexDirection: 'column',
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
      <div className="preview-container">
        <SideBarParent />
        <DropWrapper>
          <div className="RGL-container">
            <ReactGridLayout
              style={styles.gridContainer}
              minHeight={800}
              rowHeight={67}
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
          </div>
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
    openSideBar: compObjArr => dispatch(openedSideBar(compObjArr)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
