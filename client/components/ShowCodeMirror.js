import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'primereact/button';

class ShowCodeMirror extends Component {
  render() {
    return (
      <div>
        <Button
          className="p-button-info p-button-raised"
          label="Show Code Mirror"
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(ShowCodeMirror);
