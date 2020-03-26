import React, { Component } from 'react';
import { Toolbar } from 'primereact/toolbar';
import ClipButton from './ClipButton';
import { Button } from 'primereact/button';

export default class ButtonBar extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleAddContainer = this.handleAddContainer.bind(this);
  }

  handleAddContainer() {
    this.props.addContainer();
  }

  render() {
    return (
      <div className="content-section implementation">
        <Toolbar>
          <Button
            onClick={this.handleAddContainer}
            label="Add Container"
            className="p-button-raised"
          />
          <div className="p-toolbar-group-right">
            <ClipButton />
          </div>
        </Toolbar>
      </div>
    );
  }
}
