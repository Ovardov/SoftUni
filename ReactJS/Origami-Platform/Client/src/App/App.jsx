import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Aside from '../Aside/Aside';
import Main from '../Main/Main';
import Input from '../Input/Input';
import Register from '../Forms/Register/Register';
import Login from '../Forms/Login/Login';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import NotFound from '../errors/NotFound/NotFound';
import utils from '../utils/index';
import styles from './app.module.css';
import userService from '../services/user-service';
import { timingSafeEqual } from 'crypto';

class App extends Component {
  constructor(props) {
    super(props);

    const isLogged = utils.isLogged();

    this.state = {
      loggedUserId: null,
      isLogged
    }
  }

  login = (history, data) => {
    userService.login(data)
      .then((res) => {
        this.setState({
          loggedUserId: res._id,
          isLogged: true
        });

        history.push('/');
      });
  }

  logout = (history) => {
    userService.logout()
      .then(() => {
        this.setState({
          isLogged: false
        });

        history.push('/');
      });
  }


  render() {
    const isLogged = utils.isLogged();

    return (
      <BrowserRouter>
        <div className={styles.app}>
          <Navigation isLogged={isLogged} loggedUserId={this.state.loggedUserId} />
          <div className={styles.container}>
            <Aside isLogged={isLogged} loggedUserId={this.state.loggedUserId} />
            <Switch>
              <Route exact path="/" component={Main} />
              <Route path='/create-post' component={Input} />
              <Route path='/register' component={Register} />
              <Route path='/login' render={(props) => <Login {...props} login={this.login} />} />
              <Route path='/profile/:id' render={(props) => <Profile {...props} logout={this.logout} />} />
              <Route path='*' component={NotFound} />
            </Switch>
          </div>
          <Footer isLogged={isLogged} loggedUserId={this.state.loggedUserId} />
        </div>
      </BrowserRouter >
    );
  }
}

export default App;
