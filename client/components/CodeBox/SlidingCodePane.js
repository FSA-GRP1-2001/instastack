import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import CodeBox from './index';
import ClipButton from '../ClipButton';
import { toggleCodeMirror } from '../../store/showCodeMirror';

class SlidingCodePane extends Component {
  render() {
    return (
      <SlidingPane
        className="some-custom-class"
        overlayClassName="some-custom-overlay-class"
        isOpen={this.props.showCodeMirror}
        width="60%"
        title={<TopCodeMenu />}
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          this.props.toggle();
        }}
      >
        <CodeBox />
      </SlidingPane>
    );
  }
}
const mapStateToProps = state => {
  return {
    showCodeMirror: state.showCodeMirror,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggle: show => dispatch(toggleCodeMirror(show)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SlidingCodePane);

const topStyles = {
  display: 'flex',
  alignItems: 'center',
};

const headerStyles = {
  marginRight: '20px',
};

const TopCodeMenu = () => {
  return (
    <div style={topStyles}>
      <h5 style={headerStyles}>Here is your project's HTML code!</h5>
      <ClipButton />
    </div>
  );
};
