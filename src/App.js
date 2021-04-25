import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Menu from './components/Menu';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/menu' component={Menu} />
        <Route exact path='/home' component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
