/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closedSideBar } from '../../store';
import { updateCode, saveStyles } from '../../store';
import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { ColorPicker } from 'primereact/colorpicker';
import { Fieldset } from 'primereact/fieldset';
import { Spinner } from 'primereact/spinner';
import { Slider } from 'primereact/slider';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { getPreviewHtml } from './DropWrapper';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domId: '',
      node: null,
      title: '',
      i: '',
      textContent: '',
      fontSize: 10,
      borderStyle: '',
      borderWidth: '',
      borderColor: '',
      borderRadius: '',
      startingProps: {},
    };
    this.handleOnShow = this.handleOnShow.bind(this);
    this.handleTextContent = this.handleTextContent.bind(this);
    this.handleFontSize = this.handleFontSize.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.handleBorderStyle = this.handleBorderStyle.bind(this);
    this.handleBorderWidth = this.handleBorderWidth.bind(this);
    this.handleBorderRadius = this.handleBorderRadius.bind(this);
    this.handlePadding = this.handlePadding.bind(this);
    this.handleBackgroundColor = this.handleBackgroundColor.bind(this);
    this.handleSaveStyles = this.handleSaveStyles.bind(this);
  }
  handleOnShow() {
    console.log('sidebar mounted ', this.props.sidebar);
    const component = document.getElementById(
      this.props.sidebar.componentDomId
    );
    const style = component.style;
    const startingProps = {
      fontSize: style.fontSize,
      color: style.color,
      borderStyle: style.borderStyle,
      borderWidth: style.borderWidth,
      borderColor: style.borderColor,
      borderRadius: style.borderRadius,
      padding: style.padding,
      backgroundColor: style.backgroundColor,
    };
    this.setState({
      domId: this.props.sidebar.componentDomId,
      node: document.getElementById(this.props.sidebar.componentDomId),
      title: this.props.sidebar.componentTitle,
      i: this.props.sidebar.i,
      textContent: component.textContent,
      ...startingProps,
    });
  }

  handleTextContent(e) {
    this.setState({ textContent: e.target.value });
    this.state.node.textContent = e.target.value;
    this.props.updateCode(getPreviewHtml());
  }

  handleFontSize(size) {
    this.setState({
      fontSize: size,
    });
    this.state.node.style.fontSize = size + 'px';
    this.props.updateCode(getPreviewHtml());
  }

  handleColor(e) {
    this.setState({ color: '#' + e.value });
    this.state.node.style.color = '#' + e.value;
    this.props.updateCode(getPreviewHtml());
  }

  handleBorderStyle(e) {
    this.setState({ borderStyle: e.value });
    this.state.node.style.borderStyle = e.value;
    this.props.updateCode(getPreviewHtml());
  }

  handleBorderWidth(e) {
    this.setState({ borderWidth: e.value + 'px' });
    this.state.node.style.borderWidth = e.value + 'px';
    this.props.updateCode(getPreviewHtml());
  }

  handleBorderRadius(e) {
    this.setState({ borderRadius: e.value });
    this.state.node.style.borderRadius = e.value + 'px';
    this.props.updateCode(getPreviewHtml());
  }

  handlePadding(e) {
    this.setState({ padding: e.value });
    this.state.node.style.padding = e.value + 'px';
    this.props.updateCode(getPreviewHtml());
  }

  handleBackgroundColor(e) {
    this.setState({ backgroundColor: e.value });
    this.state.node.style.backgroundColor = '#' + e.value;
    this.props.updateCode(getPreviewHtml());
  }

  handleSaveStyles() {
    console.log('saving styles');
    const styleObj = {
      fontSize: this.state.fontSize,
      color: this.state.color,
      borderStyle: this.state.borderStyle,
      borderWidth: this.state.borderWidth,
      borderColor: this.state.borderColor,
      borderRadius: this.state.borderRadius,
      padding: this.state.padding,
      backgroundColor: this.state.backgroundColor,
    };
    console.log('saving styles ', styleObj);
    this.props.saveStyles(styleObj, this.state.domId, this.state.i);
  }
  render() {
    const { componentDomId, componentTitle } = this.props.sidebar;
    return (
      <Sidebar
        onShow={this.handleOnShow}
        className="ui-sidebar-sm"
        visible={this.props.sidebar.visible}
        onHide={this.props.closedSideBar}
      >
        <h4>{componentTitle}</h4>
        <p>ID: {componentDomId}</p>
        <Fieldset legend="Text Properites">
          <label htmlFor="Text Content">Text Content</label>
          <InputText
            value={this.state.textContent}
            onChange={e => this.handleTextContent(e)}
          />
          <label>Font Color</label>
          <ColorPicker
            value={this.state.color}
            onChange={e => this.handleColor(e)}
          />
          <label>Font Size</label>
          <Spinner
            min={10}
            max={44}
            value={this.state.fontSize}
            onChange={e => this.handleFontSize(e.value)}
          />
        </Fieldset>
        <Fieldset legend="Component Properites">
          <label>Border Style</label>
          <Dropdown
            value={this.state.borderStyle}
            options={borderStyles}
            onChange={e => this.handleBorderStyle(e)}
            placeholder="Select a border style"
          />
          <label>Border Width</label>
          <Spinner
            min={1}
            max={12}
            value={this.state.borderWidth}
            onChange={e => this.handleBorderWidth(e)}
          />
          <label>Border Radius: {this.state.borderRadius}px</label>
          <Slider
            value={this.state.borderRadius}
            min={0}
            max={20}
            onChange={e => this.handleBorderRadius(e)}
          />
          <label>Padding</label>
          <Spinner
            min={1}
            max={25}
            value={this.state.padding}
            onChange={e => this.handlePadding(e)}
          />
          <label>Background Color</label>
          <ColorPicker
            value={this.state.backgroundColor}
            onChange={e => this.handleBackgroundColor(e)}
          />
        </Fieldset>
        <Button label="Save" onClick={this.handleSaveStyles} />
        <Button className="p-button-warning" label="Cancel" />
      </Sidebar>
    );
  }
}

const mapStateToProps = state => {
  return {
    sidebar: state.sidebar,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closedSideBar: () => dispatch(closedSideBar()),
    updateCode: code => dispatch(updateCode(code)),
    saveStyles: (styles, domId, i) => dispatch(saveStyles(styles, domId, i)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);

const borderStyles = [
  'solid',
  'dotted',
  'dashed',
  'double',
  'groove',
  'ridge',
  'inset',
  'onset',
  'outset',
  'none',
  'hidden',
];
