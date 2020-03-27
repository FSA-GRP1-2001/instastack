import React from 'react';

const ContainerBox = props => {
  const { i, dragClass, item, containerStyle } = props;
  return (
    <div id={i} data-grid={item} style={containerStyle}>
      <span className={dragClass}>Drag handle</span>
      <span>Edit Button</span>
    </div>
  );
};

export default ContainerBox;
