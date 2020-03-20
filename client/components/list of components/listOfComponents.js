import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllComponents } from '../../store';

class ListOfComponents extends Component {
  componentDidMount() {
    this.props.getAllComponents();
  }
  render() {
    console.log('in lof', this.props);
    const { components } = this.props;
    return (
      <div>
        {/* supposed to import all the components available */}
        <p>List of currently available components:</p>
        {components.map(component => {
          return (
            <div key={component.id}>
              <p>{component.title}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    components: state.component.allComponents,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllComponents: () => dispatch(getAllComponents()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfComponents);
