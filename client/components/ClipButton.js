import React from 'react';
import { connect } from 'react-redux';

const ClipButton = props => {
  //destructuring code off props
  // make a button that treats code as a string
  // copies string to clipboard on click

  return (
    <>
      <button type="button">Push Me</button>
      <div>This is the Clip Button</div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    code: state.code,
  };
};

export default connect(mapStateToProps)(ClipButton);
