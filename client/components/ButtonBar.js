import React, { Component } from 'react';
import { saveProject, createProject } from '../store';
import { connect } from 'react-redux';
import { Toolbar } from 'primereact/toolbar';
import ClipButton from './ClipButton';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const styling = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

class ButtonBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.currentProject.title,
    };
    this.handleAddContainer = this.handleAddContainer.bind(this);
    this.handleProjectSave = this.handleProjectSave.bind(this);
    this.handleAddTitle = this.handleAddTitle.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleAddContainer() {
    this.props.addContainer();
  }

  async handleProjectSave() {
    const containers = this.props.usedContainers;
    const components = this.props.usedComponents;
    const styles = this.props.usedStyles;
    const id = this.props.currentProject.id;
    console.log('current proj id is ', id);
    await this.props.saveProject(components, containers, styles, id);
  }

  handleAddTitle(e) {
    this.setState({ title: e.target.value });
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      console.log('enter', this.state);
      this.props.createProject(this.state.title, this.props.userId);
      console.log('new id is ', this.props.currentProject.id);
    }
  }

  render() {
    console.log('title is ', this.props.currentProject.title);
    return (
      <div className="content-section implementation">
        <Toolbar style={styling.container}>
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
            label="Save"
            className="p-button-rounded p-button-warning"
            onClick={this.handleProjectSave}
            disabled={this.props.currentProject.id === ''}
          />
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

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    title: state.currentProject.title,
    currentProject: state.currentProject,
    usedContainers: state.containers,
    usedComponents: state.usedComponents,
    usedStyles: state.usedStyles,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProject: (title, userId) => dispatch(createProject(title, userId)),
    saveProject: (usedComponents, containers, styles, projId) =>
      dispatch(saveProject(usedComponents, containers, styles, projId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonBar);
