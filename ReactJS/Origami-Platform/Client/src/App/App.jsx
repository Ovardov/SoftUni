import React from 'react';
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
import styles from './app.module.css';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Navigation />
        <div className={styles.container}>
          <Aside />
            <Switch>
              <Route exact path="/" component={Main} />
              <Route path='/create-post' component={Input} />
              <Route path='/register' component={Register} />
              <Route path='/login' component={Login} />
              <Route path='/profile' component={Profile} />
              <Route path='*' component={NotFound} />
            </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
