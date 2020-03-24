import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import ClipButton from './ClipButton';

export default class ButtonBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        {
          label: 'Clip',
          icon: 'pi pi-fw pi-power-off',
        },
      ],
    };
  }

  render() {
    return (
      <div className="content-section implementation">
        {/* <Menubar model={this.state.items}></Menubar> */}
        <ClipButton />
      </div>
    );
  }
}
