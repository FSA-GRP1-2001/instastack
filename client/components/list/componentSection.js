import React, { Component } from 'react';
import { connect } from 'react-redux';
import DragWrapper from './DragWrapper';
import { getAllComponents } from '../../store';

const para = {
  id: 11,
  title: 'Paragraph',
  textContent: 'Enter text here',
  openTag: '<p>',
  closeTag: '</p>',
  wholeTag: '<p>Enter text here</p>',
};

const image = {
  id: 22,
  title: 'Image',
  textContent: 'Image url here',
  openTag: '<img>',
  closeTag: '',
  src: 'https://source.unsplash.com/random/250x250',
  wholeTag:
    '<img src="https://source.unsplash.com/random/250x250" alt="random image" >',
};

class ListOfComponents extends Component {
  componentDidMount() {
    this.props.getAllComponents();
  }
  render() {
    console.log('in lof', this.props);
    const { components } = this.props;
    const dummyComponents = [para, image];
    const haveComponents = components.length > 0;
    return (
      <div className="component-selection-sidebar">
        {/* supposed to import all the components available */}
        <p>List of currently available components:</p>
        {haveComponents &&
          [...dummyComponents, ...components].map(component => {
            return (
              <DragWrapper
                key={component.id}
                component={component}
                id={component.id}
              >
                {component.title}
              </DragWrapper>
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
