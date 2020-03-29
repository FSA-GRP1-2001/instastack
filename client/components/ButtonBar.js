import React, { Component } from 'react';
import { saveProject } from '../store';
import { connect } from 'react-redux';
import { Toolbar } from 'primereact/toolbar';
import ClipButton from './ClipButton';
import { Button } from 'primereact/button';

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
      <div className="content-section implementation">
        <Toolbar>
          <Button
            onClick={this.handleAddContainer}
            label="Add Container"
            className="p-button-raised"
          />
          <Button
            label="Save"
            className="p-button-rounded p-button-warning"
            onClick={this.handleProjectSave}
          />
          <div className="p-toolbar-group-right">
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
