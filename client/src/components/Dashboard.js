import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchItems } from '../actions';

class Dashboard extends Component {
  componentWillMount() {
    this.props.fetchItems();
  }

  render() {
    console.log('In dashboard:', this.props.items);
    return (
      <Grid container spacing={0}>
        <Grid item style={{ padding: '20px 0px', margin: 'auto' }}xs={8}>
          <div>
            Dashboard
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items,
  }
}

export default connect(mapStateToProps, { fetchItems })(Dashboard);