import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import TaskPage from './TaskPage';
import CategoryPage from './CategoryPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/tasks" component={TaskPage} />
        <Route path="/categories" component={CategoryPage} /> 
        <Route exact path="/" render={() => <div>Welcome to the app</div>} />
      </Switch>
    </Router>
  );
}

export default App;
