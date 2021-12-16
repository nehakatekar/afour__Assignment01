import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ExpenseDetails from "./components/ExpenseDetails"
import ExpanseDashboard from './components/ExpanseDashboard';
import LoginPage from './components/LoginPage';
import LoginForm from './components/LoginForm';

 class App extends Component {
  render() {
    return (
      <div>  
        
        <Router>
          <Switch>
            <Route exact path="/" component={LoginForm}/>
       
            <Route exact path="/expanseDashboard" component={ExpanseDashboard}/>
            <Route exact path="/details" component={ExpenseDetails}></Route>
            <Route exact path="/loginpage" component={LoginPage}></Route>
            <Route exact path="/loginForm" component={LoginForm}></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}


export default App;
