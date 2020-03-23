import React, { Component } from 'react';
import { connect } from 'react-redux';
import DragItem from './DragItem';
import { getAllComponents } from '../../store';

class ListOfComponents extends Component {
  componentDidMount() {
    this.props.getAllComponents();
  }
  render() {
    console.log('in lof', this.props);
    const { components } = this.props;
    const haveComponents = components.length > 0;
    return (
      <div className="component-selection-sidebar">
        {/* supposed to import all the components available */}
        <p>List of currently available components:</p>
        {haveComponents &&
          components.map(component => {
            return (
              <DragItem key={component.id} component={component}>
                {component.title}
              </DragItem>
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
