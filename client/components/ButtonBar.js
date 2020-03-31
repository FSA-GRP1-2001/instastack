/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { saveProject, createProject } from '../store';
import { connect } from 'react-redux';
import { Toolbar } from 'primereact/toolbar';
import ClipButton from './ClipButton';
import { Button } from 'primereact/button';
import ShowCodeMirror from './ShowCodeMirror';
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
      showPreview: false,
    };
    this.handleAddContainer = this.handleAddContainer.bind(this);
    this.handleProjectSave = this.handleProjectSave.bind(this);
    this.handleAddTitle = this.handleAddTitle.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handlePreviewHtml = this.handlePreviewHtml.bind(this);
  }

  handleAddContainer() {
    this.props.addContainer();
  }

  async handleProjectSave() {
    const containers = this.props.usedContainers;
    const components = this.props.usedComponents;
    const styles = this.props.usedStyles;
    const id = this.props.currentProject.id;
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

  handlePreviewHtml() {
    const containers = [...document.querySelectorAll('.react-grid-item')];
    const icons = [
      ...document.querySelectorAll('.pi-trash'),
      ...document.querySelectorAll('.pi-pencil'),
      ...document.querySelectorAll('.react-resizable-handle'),
    ];
    console.log(icons);
    if (this.state.showPreview) {
      containers.map(c => (c.style.backgroundColor = ''));
      icons.map(i => (i.style.display = ''));
    } else {
      containers.map(c => (c.style.backgroundColor = 'white'));
      icons.map(i => (i.style.display = 'none'));
    }
    this.setState(prevState => ({ showPreview: !prevState.showPreview }));
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
          <div className="ui-toolbar">
            <Button
              onClick={this.handleAddContainer}
              label="Add Container"
              className="p-button-raised ui-button p-button-rounded"
              disabled={this.state.showPreview}
            />
            <Button
              label="Save"
              className="p-button-warning ui-button p-button-rounded"
              onClick={this.handleProjectSave}
              disabled={this.props.currentProject.id === ''}
            />
            <Button
              onClick={this.handleAddContainer}
              label="Add Container"
              className="p-button-raised p-button-rounded"
            />
            <Button
              onClick={this.handlePreviewHtml}
              className="p-button-raised p-button-rounded"
              icon={this.state.showPreview ? 'pi pi-eye-slash' : 'pi pi-eye'}
            />
            <div className="p-toolbar-group-right ui-button p-button-rounded">
              <ShowCodeMirror />
            </div>

            <div className="p-toolbar-group-right ui-button">
              <ClipButton />
            </div>
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
