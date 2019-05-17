import React, { Component } from 'react';
import './App.css';
import routes from './routes'
import NavBar from './Components/NavBar/NavBar'
import {Provider} from 'react-redux'
import store from './ducks/store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
        <NavBar/>
        {routes}
        </div>
      </Provider>
      
    );
  }
}

export default App;
