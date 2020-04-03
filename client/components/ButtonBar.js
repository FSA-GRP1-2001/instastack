/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { saveProject, createProject } from '../store';
import { connect } from 'react-redux';
import { Toolbar } from 'primereact/toolbar';
import ClipButton from './ClipButton';
import { Button } from 'primereact/button';
import ShowCodeMirror from './ShowCodeMirror';
import { InputText } from 'primereact/inputtext';
import { Growl } from 'primereact/growl';

const styling = {
  toolBarOverride: {
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid transparent',
    marginTop: '9px',
  },
  buttonContainer: {
    width: '75%',
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

  // componentDidMount() {
  //   this.growl.show({
  //     severity: 'info',
  //     summary: 'Give project a name',
  //     detail: "Press 'Enter' key  to save project name",
  //     sticky: true,
  //   });
  // }

  handleAddContainer() {
    this.props.addContainer();
  }

  async handleProjectSave() {
    const containers = this.props.usedContainers;
    const components = this.props.usedComponents;
    const styles = this.props.usedStyles;
    const id = this.props.currentProject.id;
    await this.props.saveProject(components, containers, styles, id);
    this.growl.show({
      severity: 'success',
      summary: 'Project saved!',
      detail: 'Your project has been saved.',
    });
  }

  handleAddTitle(e) {
    this.setState({ title: e.target.value });
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.props.createProject(this.state.title, this.props.userId);
      this.growl.show({
        severity: 'success',
        summary: 'Project created!',
        detail: 'You made a new project!',
      });
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
    return (
      <div className="content-section implementation">
        <Toolbar style={styling.toolBarOverride}>
          <div>
            <Growl ref={el => (this.growl = el)} position="topright" />
            <span className="p-float-label">
              <InputText
                value={this.state.title}
                onKeyDown={e => this.handleKeyDown(e)}
                onChange={e => this.handleAddTitle(e)}
              />
              <label htmlFor="title">Project Name</label>
            </span>
          </div>
          <div
            className="ui-toolbar"
            style={{ ...styling.container, ...styling.buttonContainer }}
          >
            <Button
              onClick={this.handleAddContainer}
              label="Add Container"
              icon="pi pi-plus"
              className="p-button-raised white-buttons"
              disabled={this.state.showPreview}
            />
            <Button
              onClick={this.handlePreviewHtml}
              className="p-button-raised white-buttons"
              icon={this.state.showPreview ? 'pi pi-eye-slash' : 'pi pi-eye'}
            />
            <Button
              label="Save"
              className="p-button-raised white-buttons"
              onClick={this.handleProjectSave}
              disabled={this.props.currentProject.id === ''}
            />
            <div className="p-toolbar-group-right ui-button">
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
