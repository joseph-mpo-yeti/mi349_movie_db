import React from 'react';
import Navbar from './components/Navbar';
import SearchResults from './components/SearchResults';
import NotificationsSystem, {wyboTheme, dismissNotification} from 'reapop'
import { connect } from 'react-redux';

function App(props) {

  return (
    <div className="App">
      <NotificationsSystem
          notifications={props.notifications}
          dismissNotification={(id) => dismissNotification(id)}
          theme={wyboTheme}
      />
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
