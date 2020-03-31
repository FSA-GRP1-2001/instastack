import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closedSideBar, updateCode, saveStyles } from '../../store';
import SideBarMenu from './SideBarMenu';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';

class SideBarParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectIdx: 0,
      currentPrevStyles: {},
      currentDomId: '',
    };
    this.handleNextItem = this.handleNextItem.bind(this);
    this.handlePrevItem = this.handlePrevItem.bind(this);
    this.handleOnShow = this.handleOnShow.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseIconHelper = this.handleCloseIconHelper.bind(this);
  }

  handleNextItem() {
    if (this.state.selectIdx >= this.props.sidebar.length - 1) return;
    this.setState(prevState => ({ selectIdx: prevState.selectIdx + 1 }));
  }
  handlePrevItem() {
    if (this.state.selectIdx <= 0) return;
    this.setState(prevState => ({ selectIdx: prevState.selectIdx - 1 }));
  }
  handleOnShow() {
    console.log('sidebar mountedParent ', this.props.sidebar);
  }

  handleCancel() {
    const prevStyles = this.state.currentPrevStyles;
    const node = document.getElementById(this.state.currentDomId);
    for (let style in prevStyles) {
      if (prevStyles[style].length) {
        console.log('resetting style ', style);
        node.style[style] = prevStyles[style];
      } else {
        node.style[style] = '';
      }
    }
  }

  handleClose() {
    this.handleCancel();
    this.props.closedSideBar();
  }

  handleCloseIconHelper(currentPrevStyles, domId) {
    this.setState({ currentPrevStyles, currentDomId: domId });
  }

  render() {
    const { selectIdx } = this.state;
    const len = this.props.sidebar.length;
    const componentMenus = this.props.sidebar.map(comp => (
      <SideBarMenu
        key={comp.domId}
        component={comp}
        cancelHelper={this.handleCloseIconHelper}
      />
    ));
    return (
      <Sidebar
        onShow={this.handleOnShow}
        className="ui-sidebar-sm"
        visible={this.props.sidebar.length > 0}
        onHide={this.handleClose}
      >
        <div style={styles.navContainer}>
          <Button
            className="p-button-secondary rounded"
            icon="pi pi-angle-left"
            onClick={this.handlePrevItem}
            style={{ visibility: selectIdx === 0 ? 'hidden' : 'visible' }}
          />
          <div style={styles.displayContainer}>
            <h4>{len && this.props.sidebar[selectIdx].title}</h4>
            <h5>ID: {len && this.props.sidebar[selectIdx].domId}</h5>
          </div>
          <Button
            className="p-button-secondary rounded"
            icon="pi pi-angle-right"
            onClick={this.handleNextItem}
            style={{
              visibility:
                selectIdx === componentMenus.length - 1 ? 'hidden' : 'visible',
            }}
          />
        </div>
        {componentMenus[selectIdx]}
      </Sidebar>
    );
  }
}

const mapStateToProps = state => {
  return {
    sidebar: state.sidebar,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closedSideBar: () => dispatch(closedSideBar()),
    updateCode: code => dispatch(updateCode(code)),
    saveStyles: (styles, domId, i) => dispatch(saveStyles(styles, domId, i)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBarParent);

const styles = {
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  displayContainer: {
    textAlign: 'center',
  },
};
