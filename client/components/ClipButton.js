import React from 'react';
// import { connect } from 'react-redux';

const ClipButton = () => {
  //destructuring code off props
  // make a button that treats code as a string
  // copies string to clipboard on click

  return (
    <div>
      <button type="button">Hello World</button>
    </div>
  );
};

export default ClipButton;

// const mapStateToProps = state => {
//   return {
//     code: state.code,
//   };
// };

// export default connect(mapStateToProps)(ClipButton);
