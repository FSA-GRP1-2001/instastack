/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropArea from './DropArea';
import Generic from '../PreviewElements/Generic';
import { updateCode } from '../../store';

const isEmpty = obj => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

class DropZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxOneEl: {},
      boxTwoEl: {},
      boxThreeEl: {},
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
    const { boxOneEl, boxTwoEl, boxThreeEl } = this.state;
    return (
      <section>
        <div className="drop-container">
          <DropArea id="boxOneEl" setEl={this.setDroppedElement}>
            {!isEmpty(boxOneEl) ? <Generic component={boxOneEl} /> : null}
          </DropArea>
          <DropArea id="boxTwoEl" setEl={this.setDroppedElement}>
            {!isEmpty(boxTwoEl) ? <Generic component={boxTwoEl} /> : null}
          </DropArea>
          <DropArea id="boxThreeEl" setEl={this.setDroppedElement}>
            {!isEmpty(boxThreeEl) ? <Generic component={boxThreeEl} /> : null}
          </DropArea>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCode: code => dispatch(updateCode(code)),
  };
};

export default connect(null, mapDispatchToProps)(DropZone);
