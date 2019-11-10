import React from 'react';
import Navigation from '../Navigation/Navigation';
import Aside from '../Aside/Aside';
import Main from '../Main/Main';
import Posts from '../Posts/Posts';
import Footer from '../Footer/Footer';
import styles from './app.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Navigation />
      <div className={styles.container}>
        <Aside />
        <Main title="Hello">
          <Posts />
        </Main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
