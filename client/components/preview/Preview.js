/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropWrapper from './DropWrapper';
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
      layout: [
        { i: '1', x: 0, y: 0, w: 1, h: 2, minH: 1, maxH: 12 }, // *** -- minH & maxH doesnt effect the grid items
        { i: '2', x: 1, y: 0, w: 1, h: 2, minH: 1, maxH: 12 },
        { i: '3', x: 3, y: 1, w: 1, h: 2, minH: 1, maxH: 12 },
        { i: '4', x: 1, y: 1, w: 1, h: 2, minH: 1, maxH: 12 },
      ],
      resizeplotly: false,
      code: '',
    };
    this.setDroppedElement = this.setDroppedElement.bind(this);
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
            // layout={this.state.layout}
            onLayoutChange={this.onLayoutChange}
            draggableHandle=".MyDragHandleClassName"
            draggableCancel=".MyDragCancel"
          >
            {/* ABove hard codes example dragable elements but we will ultimately get these from parts of our state */}
            {this.props.containers.map((item, idx) => {
              return (
                <div
                  className="MyDragHandleClassName"
                  key={idx + 1}
                  data-grid={item}
                />
              );
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
