import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCode } from '../../store';

class DropWrapper extends Component {
  constructor(props) {
    super(props);
  }

  getPreviewHtml() {
    const grid = document.querySelector('.react-grid-layout');
    const html = grid.innerHTML;
    return html;
  }

  drop = e => {
    e.preventDefault();
    const data = e.dataTransfer.getData('transfer');
    console.log('got data ', data);
    if (data && !e.target.classList.contains('react-grid-layout')) {
      e.target.appendChild(document.getElementById(data));
      this.props.updateCode(this.getPreviewHtml());
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

const mapDispatchToProps = dispatch => {
  return {
    updateCode: code => dispatch(updateCode(code)),
  };
};

export default connect(null, mapDispatchToProps)(DropWrapper);
