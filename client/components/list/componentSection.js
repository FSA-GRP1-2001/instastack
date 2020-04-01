import React, { Component } from 'react';
import { connect } from 'react-redux';
import DragWrapper from './DragWrapper';
import { getAllComponents } from '../../store';
import { Card } from 'primereact/card';

class ListOfComponents extends Component {
  componentDidMount() {
    this.props.getAllComponents();
  }
  render() {
    console.log('in lof', this.props);
    const { components } = this.props;
    const haveComponents = components.length > 0;
    return (
      // <div className="component-selection-sidebar">
      <Card className="component-selection-sidebar">
        {haveComponents &&
          [...components].map(component => {
            return (
              <DragWrapper
                key={component.id}
                component={component}
                id={component.id}
              >
                {component.displayName}
              </DragWrapper>
            );
          })}
      </Card>
      // </div>
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
