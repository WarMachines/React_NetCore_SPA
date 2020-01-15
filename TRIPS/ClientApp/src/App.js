import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import Trips from './components/Trip/Trips';
import { Create } from './components/Trip/Create';
import './custom.css'
import { Update } from './components/Trip/Update';
import { Delete } from './components/Trip/Delete';
import SecureRoute from './secureRoute/SecuredRoute';
import { BrowserRouter, Switch } from 'react-router-dom';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Layout>
            <Route exact path='/' component={Home} />
            <SecureRoute path='/counter' component={Counter} />
            <SecureRoute path='/fetch-data' component={FetchData} />
            <SecureRoute path='/trips' component = {Trips} />
            <SecureRoute path='/create' component = {Create} />
            <SecureRoute path='/update/:id' component = {Update} />
            <SecureRoute path='/delete/:id' component = {Delete} />
          </Layout>
        </Switch>
      </BrowserRouter>
    );
  }
}
