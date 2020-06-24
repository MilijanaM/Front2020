import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './components/HomePage/HomePage';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MainMenu, MainMenuItem } from './components/MainMenu/MainMenu';
import {HashRouter, Switch, Route} from 'react-router-dom';
import ContactPage from './components/ContactPage/ContactPage';
import AdminLoginPage from './components/AdminLoginPage/AdminLoginPage';
import CategoryPage from './components/CategoryPage/CategoryPage';

const menuItems = [
   new MainMenuItem("Home", "/"),
   new MainMenuItem("Contact", "/contact/"),
   new MainMenuItem("Log in", "/admin/login/"),
   
];

ReactDOM.render(
  <React.StrictMode>
    <MainMenu items={menuItems}></MainMenu>
    <HashRouter>
     <Switch>
       <Route exact path="/" component={HomePage}/> 
       <Route path="/contact" component={ContactPage}/> 
       <Route path="/admin/login" component={AdminLoginPage}/> 
       <Route path ="/category/:id" component={CategoryPage}/>

     </Switch>

    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
