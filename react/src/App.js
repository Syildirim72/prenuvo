import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import './sass/styles.css';
import Images from './components/Images'
import Form from './components/Form'

class App extends Component {
  render() {
    return (
      <div className="prenuvo">
          <ul className="pages">
              <Link to="/images" className="navigation-ul--link">Images</Link>
              <Link to="/form" className="navigation-ul--link">Form</Link>
          </ul>

        <Switch>
          <Route path="/images" render = { () => (
            <Images />
          )} />

          <Route path="/form" render = { () => (
            <Form />
          )} />
        </Switch>
      </div>
    );
  }
}

export default App;
