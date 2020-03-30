import React, { Component } from 'react';
import { saveProject } from '../store';
import { connect } from 'react-redux';
import { Toolbar } from 'primereact/toolbar';
import ClipButton from './ClipButton';
import { Button } from 'primereact/button';
import ShowCodeMirror from './ShowCodeMirror';

class ButtonBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleAddContainer = this.handleAddContainer.bind(this);
    this.handleProjectSave = this.handleProjectSave.bind(this);
  }

  handleAddContainer() {
    this.props.addContainer();
  }

  handleProjectSave() {
    const containers = this.props.usedContainers;
    const components = this.props.usedComponents;
    const styles = this.props.usedStyles;
    this.props.saveProject(components, containers, styles);
  }

  render() {
    return (
      <div className="ui-toolbar">
        <Toolbar>
          <Button
            onClick={this.handleAddContainer}
            label="Add Container"
            className="p-button-raised ui-button"
          />
          <Button
            label="Save"
            className="p-button-warning ui-button"
            onClick={this.handleProjectSave}
          />

          <div className="p-toolbar-group-right ui-button">
            <ShowCodeMirror />
          </div>

          <div className="p-toolbar-group-right ui-button">
            <ClipButton />
          </div>
        </Toolbar>
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
    saveProject: (usedComponents, containers, styles) =>
      dispatch(saveProject(usedComponents, containers, styles)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonBar);
