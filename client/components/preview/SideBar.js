import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closedSideBar } from '../../store';
import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { ColorPicker } from 'primereact/colorpicker';
import { Fieldset } from 'primereact/fieldset';
import { Spinner } from 'primereact/spinner';
import { Slider } from 'primereact/slider';
import { Button } from 'primereact/button';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.sidebar.visible,
    };
  }
  render() {
    const { componentDomId, componentTitle } = this.props.sidebar;
    return (
      <Sidebar
        className="ui-sidebar-sm"
        visible={this.props.sidebar.visible}
        onHide={this.props.closedSideBar}
      >
        <h4>{componentTitle}</h4>
        <p>ID: {componentDomId}</p>
        <Fieldset legend="Text Properites">
          <label htmlFor="Text Content">Text Content</label>
          <InputText />
          <label>Font Color</label>
          <ColorPicker />
          <label>Font Size</label>
          <Spinner min={10} max={34} />
        </Fieldset>
        <Fieldset legend="Component Properites">
          <label>Border</label>
          <Spinner min={0} max={20} />
          <label>Border Radius</label>
          <Slider />
          <label>Padding</label>
          <Spinner min={10} max={20} />
          <label>Background Color</label>
          <ColorPicker />
        </Fieldset>
        <Button label="Save" />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
