import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';

// Components
import Header from './Header';
import Dashboard from './Dashboard';



const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Header />
          <Route exact path='/dashboard' component={Dashboard} />          
        </div>
      </Router>
    </Provider>
  );
}

export default App;