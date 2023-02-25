import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import store from './store';

import Main from './components/Layout/Main';

import Home from "./components/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Profile from "./components/Profile/Profile";
import NotFound from './components/Search/NotFound';

import setAuthHeader from './utils/setAuthHeader';
import {logoutUser, getCurrentUser} from './actions/authActions';

if (localStorage.getItem('jwtToken')) 
{
  const currentTime = Date.now() / 1000;
  const decode = jwt_decode(localStorage.getItem('jwtToken'))

  if (currentTime > decode.exp) 
  {
    //нет авторизованного пользователя
    store.dispatch(logoutUser())
    window.location.href = '/';
  } 
  else 
  {
    //есть авторизованный пользователь
    setAuthHeader(localStorage.getItem('jwtToken'))
    //информацию об авторизованном пользователе передаем в store
    store.dispatch(getCurrentUser())
  }
}

class App extends Component {
  render () {
    return (
      //фиксируем хранилище store
      <Provider store={store}>
        <div>
          <BrowserRouter>
            <Main>
              <Switch>
                {/*Общая страница Home */}
                <Route exact path="/" component={Home}/>
                {/*Страница авторизации зарегистированного пользователя*/}
                <Route path="/login" component={Login}/>
                {/*Страница регистрации пользователя */}
                <Route path="/register" component={Register}/>
                {/*Страница постов пользователя с соответствующим идентификатором */}
                <Route path="/profile/:userId" component={Profile}/>
                {/*Страница, говорящая о том что заданный пользователь не найден */}
                <Route path="/not_found_user" component={NotFound}/>
              </Switch>
            </Main>
          </BrowserRouter>      
        </div>
      </Provider>
    );
  }
}

export default App;