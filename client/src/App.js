import React, { Component } from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import Content from './containers/Content'

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
        <Content />
        <Footer />
      </div>
    );
  }
}

export default App;
