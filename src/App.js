import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Details from './details/Details';
import Home from './home/Home';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Route exact path='/' component={Home} />
        <Route exact path='/details/:id' component={Details} />
      </div>
      </Router>
    );
  }
}
export default App;
