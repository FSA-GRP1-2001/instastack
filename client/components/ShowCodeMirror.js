import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'primereact/button';
import { toggleCodeMirror } from '../store/showCodeMirror';

class ShowCodeMirror extends Component {
  constructor(props) {
    super(props);
    this.toggleCode = this.toggleCode.bind(this);
  }
  toggleCode() {
    console.log('test', this.props.toggleCodeMirror);
    this.props.toggle();
  }

  render() {
    const label = this.props.showCodeMirror
      ? 'Hide Code Mirror'
      : 'Show Code Mirror';
    return (
      <div>
        <Button
          className="p-button-info p-button-raised"
          label={label}
          onClick={this.toggleCode}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showCodeMirror: state.showCodeMirror,
  };
};

const mapDispatchToProps = dispatch => {
  console.log('here', toggleCodeMirror);

  return {
    toggle: show => dispatch(toggleCodeMirror(show)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowCodeMirror);
