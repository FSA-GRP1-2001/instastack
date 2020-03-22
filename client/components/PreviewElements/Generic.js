import React from 'react';

const styles = {
  container: {
    margin: '0 auto',
  },
};

const Generic = ({ component }) => {
  return (
    <div style={styles.container}>
      {component.textContent !== null
        ? component.textContent
        : 'Enter Text Content'}
    </div>
  );
};

export default Generic;
