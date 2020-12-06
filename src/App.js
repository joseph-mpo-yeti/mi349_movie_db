import React from 'react';
import Navbar from './components/Navbar';
import SearchResults from './components/SearchResults';
import { connect } from 'react-redux';
import ReactNotification from 'react-notifications-component'

function App(props) {
  return (
    <div className="App">
        <ReactNotification isMobile={true} />
        <Navbar />
        <SearchResults />
    </div>
  );
}

const mapStateToProps = (state) => { 
  return {
    notifications: state.notifications
  }
}

export default connect(mapStateToProps)(App);
