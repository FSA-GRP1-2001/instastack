import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  closedSideBar,
  updateCode,
  saveStyles,
  updatedComponent,
} from '../../store';
import { InputText } from 'primereact/inputtext';
import { ColorPicker } from 'primereact/colorpicker';
import { Fieldset } from 'primereact/fieldset';
import { Spinner } from 'primereact/spinner';
import { Slider } from 'primereact/slider';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { getPreviewHtml } from './DropWrapper';

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

const horizontalAlignment = ['center', 'flex-start', 'flex-end'];

const colorPickerBox = {
  display: 'flex',
  alignItems: 'center',
  paddingTop: '5px',
};

const colorLabel = {
  marginRight: '6px',
};

class SideBarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domId: '',
      tagName: '',
      node: null,
      i: '',
      src: '',
      imageWidth: '',
      textContent: '',
      fontSize: '',
      borderStyle: '',
      borderWidth: '',
      borderColor: '',
      borderRadius: '',
      alignSelf: '',
      prevStyles: {},
    };
    this.handleTextContent = this.handleTextContent.bind(this);
    this.handleFontSize = this.handleFontSize.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.handleBorderStyle = this.handleBorderStyle.bind(this);
    this.handleBorderWidth = this.handleBorderWidth.bind(this);
    this.handleBorderRadius = this.handleBorderRadius.bind(this);
    this.handlePadding = this.handlePadding.bind(this);
    this.handleBackgroundColor = this.handleBackgroundColor.bind(this);
    this.handleSaveStyles = this.handleSaveStyles.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleImageSrc = this.handleImageSrc.bind(this);
    this.handleImageWidth = this.handleImageWidth.bind(this);
    this.handleAlignment = this.handleAlignment.bind(this);
  }

  componentDidMount() {
    const node = document.getElementById(this.props.component.domId);
    const style = node.style;
    const startingProps = {
      fontSize: style.fontSize,
      imageWidth: node.style.width,
      color: style.color,
      borderStyle: style.borderStyle,
      borderWidth: style.borderWidth,
      borderColor: style.borderColor,
      borderRadius: style.borderRadius,
      padding: style.padding,
      backgroundColor: style.backgroundColor,
    };
    if (node.tagName === 'IMG') {
      startingProps.src = node.src;
    }
    this.setState({
      node: node,
      tagName: node.tagName,
      i: this.props.component.i,
      domId: this.props.component.domId,
      textContent: node.textContent,
      ...startingProps,
      prevStyles: startingProps,
    });
    this.props.cancelHelper(startingProps, this.props.component.domId);
  }

  handleTextContent(e) {
    this.setState({ textContent: e.target.value });
    const node = this.state.node;
    node.textContent = e.target.value;
    this.setState({ node });
    this.props.updateCode(getPreviewHtml());
  }

  handleFontSize(e) {
    this.setState({
      fontSize: e.value,
    });
    const node = this.state.node;
    node.style.fontSize = e.value + 'px';
    this.setState({ node });
    this.props.updateCode(getPreviewHtml());
  }

  handleColor(e) {
    this.setState({ color: '#' + e.value });
    const node = this.state.node;
    node.style.color = '#' + e.value;
    this.setState({ node });
    this.props.updateCode(getPreviewHtml());
  }

  handleBorderStyle(e) {
    this.setState({ borderStyle: e.value });
    const node = this.state.node;
    node.style.borderStyle = e.value;
    this.setState({ node });
    this.props.updateCode(getPreviewHtml());
  }

  handleBorderWidth(e) {
    this.setState({ borderWidth: e.value + 'px' });
    const node = this.state.node;
    node.style.borderWidth = e.value + 'px';
    this.setState({ node });
    this.props.updateCode(getPreviewHtml());
  }

  handleBorderRadius(e) {
    this.setState({ borderRadius: e.value });
    const node = this.state.node;
    node.style.borderRadius = e.value + 'px';
    this.setState({ node });
    this.props.updateCode(getPreviewHtml());
  }

  handlePadding(e) {
    this.setState({ padding: e.value });
    const node = this.state.node;
    node.style.padding = e.value + 'px';
    this.setState({ node });
    this.props.updateCode(getPreviewHtml());
  }

  handleBackgroundColor(e) {
    this.setState({ backgroundColor: '#' + e.value });
    const node = this.state.node;
    node.style.backgroundColor = '#' + e.value;
    this.setState({ node });
    this.props.updateCode(getPreviewHtml());
  }

  handleSaveStyles() {
    console.log('saving styles');
    const styleObj = {
      fontSize: this.state.fontSize,
      src: this.state.src,
      imageWidth: this.state.imageWidth,
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
    let updateObj = {
      domId: this.state.domId,
      content: this.state.textContent,
    };
    this.props.updatedComponent(updateObj);
  }

  handleCancel() {
    const prevStyles = this.state.prevStyles;
    const node = this.state.node;
    for (let style in prevStyles) {
      if (prevStyles[style].length) {
        console.log('resetting style ', style);
        node.style[style] = prevStyles[style];
      } else {
        node.style[style] = '';
      }
    }
    this.props.closedSideBar();
  }

  handleClose() {
    this.handleCancel();
    this.props.closedSideBar();
  }

  handleImageSrc(e) {
    console.log(e.target.value);
    this.setState({ src: e.target.value });
    const node = this.state.node;
    node.src = e.target.value;
    this.setState({ node });
    this.props.updateCode(getPreviewHtml());
  }
  handleImageWidth(e) {
    this.setState({ imageWidth: e.value });
    const node = this.state.node;
    node.style.width = e.value + '%';
    this.setState({ node });
    this.props.updateCode(getPreviewHtml());
  }
  handleAlignment(e) {
    this.setState({ alignSelf: e.value });
    const node = this.state.node;
    node.style.alignSelf = e.value;
    this.setState({ node });
    this.props.updateCode(getPreviewHtml());
  }
  render() {
    return (
      <section>
        {this.state.tagName === 'IMG' && (
          <Fieldset legend="Image Properites">
            <label htmlFor="Image Src">Image Src</label>
            <InputText value={this.state.src} onChange={this.handleImageSrc} />
            <label>Image Width (%)</label>
            <Spinner
              min={10}
              max={100}
              step={2}
              value={this.state.imageWidth}
              onChange={this.handleImageWidth}
            />
          </Fieldset>
        )}
        {['DIV', 'H1'].includes(this.state.tagName) && (
          <Fieldset legend="Text Properites">
            <label htmlFor="Text Content">Text Content</label>
            <InputText
              value={this.state.textContent}
              onChange={this.handleTextContent}
            />
            <div style={colorPickerBox}>
              <label style={colorLabel}>Font Color </label>
              <ColorPicker
                value={this.state.color}
                onChange={this.handleColor}
              />
            </div>

            <label>Font Size</label>
            <Spinner
              min={10}
              max={44}
              value={this.state.fontSize}
              onChange={this.handleFontSize}
            />
          </Fieldset>
        )}
        {this.state.tagName === 'P' && (
          <Fieldset legend="Text Properites">
            <label htmlFor="Text Content">Text Content</label>
            <InputTextarea
              rows={3}
              cols={25}
              value={this.state.textContent}
              onChange={this.handleTextContent}
            />
            <div style={colorPickerBox}>
              <label style={colorLabel}>Font Color </label>
              <ColorPicker
                value={this.state.color}
                onChange={this.handleColor}
              />
            </div>

            <label>Font Size</label>
            <Spinner
              min={10}
              max={44}
              value={this.state.fontSize}
              onChange={this.handleFontSize}
            />
          </Fieldset>
        )}
        <Fieldset legend="Component Properites">
          <label>Horizontal Alignment</label>
          <Dropdown
            value={this.state.alignSelf}
            options={horizontalAlignment}
            onChange={this.handleAlignment}
            placeholder="Select an alignment"
          />
          <label>Border Style</label>
          <Dropdown
            value={this.state.borderStyle}
            options={borderStyles}
            onChange={this.handleBorderStyle}
            placeholder="Select a border style"
          />
          <label>Border Width</label>
          <Spinner
            min={1}
            max={12}
            value={this.state.borderWidth}
            onChange={this.handleBorderWidth}
          />
          <label>Border Radius: {this.state.borderRadius}px</label>
          <Slider
            value={this.state.borderRadius}
            min={0}
            max={20}
            onChange={this.handleBorderRadius}
          />
          <label>Padding</label>
          <Spinner
            min={1}
            max={25}
            value={this.state.padding}
            onChange={this.handlePadding}
          />
          <div style={colorPickerBox}>
            <label style={colorLabel}>Background Color</label>
            <ColorPicker
              value={this.state.backgroundColor}
              onChange={this.handleBackgroundColor}
            />
          </div>
        </Fieldset>
        <Fieldset legend="Save Changes">
          <div style={styles.buttonContainer}>
            <Button
              label="Save"
              icon="pi pi-check"
              onClick={this.handleSaveStyles}
            />
            <Button
              className="p-button-warning"
              icon="pi pi-times-circle"
              label="Cancel"
              onClick={this.handleClose}
            />
          </div>
        </Fieldset>
      </section>
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
    updatedComponent: updateObj => dispatch(updatedComponent(updateObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBarMenu);

const styles = {
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};
