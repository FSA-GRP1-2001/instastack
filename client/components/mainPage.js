import React, { Component } from 'react';
import ComponentSection from './list/componentSection';
import PreviewSection from './list/previewSection';
import CodeSection from './list/codeSection';

export default class mainPage extends Component {
  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridGap: 20,
        }}
      >
        <ComponentSection />
        <PreviewSection />
        <CodeSection />
      </div>
    );
  }
}
