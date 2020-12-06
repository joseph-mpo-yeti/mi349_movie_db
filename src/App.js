import React from 'react';
import Navbar from './components/Navbar';
import SearchResults from './components/SearchResults';
import { connect } from 'react-redux';
import ReactNotification from 'react-notifications-component'
import Loaders from './components/Loaders';

function App({loading}) {
  return (
    <div className="App">
        <ReactNotification/>
        <Navbar />
        <Loaders loading={loading} />
        <SearchResults />
    </div>
  );
}

const mapStateToProps = (state) => { 
  return {
    loading: state.loading
  }
}

export default connect(mapStateToProps)(App);
