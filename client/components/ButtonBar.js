import React, { Component } from 'react';
import { saveProject, createProject } from '../store';
import { connect } from 'react-redux';
import { Toolbar } from 'primereact/toolbar';
import ClipButton from './ClipButton';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

class ButtonBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
    this.handleAddContainer = this.handleAddContainer.bind(this);
    this.handleProjectSave = this.handleProjectSave.bind(this);
    this.handleAddTitle = this.handleAddTitle.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleAddContainer() {
    this.props.addContainer();
  }

  handleProjectSave() {
    const containers = this.props.usedContainers;
    const components = this.props.usedComponents;
    const styles = this.props.usedStyles;
    const id = this.props.currentProject.id;
    this.props.saveProject(components, containers, styles, id);
  }

  handleAddTitle(e) {
    this.setState({ title: e.target.value });
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      console.log('enter', this.state);
      this.props.createProject(this.state.title);
      this.handleProjectSave();
    }
  }

  render() {
    return (
      <div className="content-section implementation">
        <Toolbar>
          <div>
            <span className="p-float-label">
              <InputText
                value={this.state.title}
                onKeyDown={e => this.handleKeyDown(e)}
                onChange={e => this.handleAddTitle(e)}
              />
              <label htmlFor="title">Project Name</label>
            </span>
          </div>
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
    title: state.currentProject.title,
    usedContainers: state.containers,
    usedComponents: state.usedComponents,
    usedStyles: state.usedStyles,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProject: title => dispatch(createProject(title)),
    saveProject: (usedComponents, containers, styles) =>
      dispatch(saveProject(usedComponents, containers, styles)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonBar);
