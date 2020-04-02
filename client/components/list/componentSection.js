import React, { Component } from 'react';
import { connect } from 'react-redux';
import DragWrapper from './DragWrapper';
import { getAllComponents } from '../../store';
import { Card } from 'primereact/card';

// I had to do this. I am sorry. A rewrite was not within scope.
// ideally, all routing would be done in routes.js
import { Route, Switch } from 'react-router-dom';

class ListOfComponents extends Component {
  componentDidMount() {
    this.props.getAllComponents();
  }
  render() {
    const { components } = this.props;
    const haveComponents = components.length > 0;
    return (
      // <div className="component-selection-sidebar">
      <section className="component-selection-sidebar">
        {/* ideally, this would not happen here. */}
        <Switch>
          <Route exact path="/mainPage">
            <div className="components-container">
              <p>
                DRAG & DROP COMPONENTS &ensp;<span>></span>
              </p>
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
            </div>
          </Route>
        </Switch>
      </section>
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
