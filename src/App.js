import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import dispersive from "./img/dispersive.png";
import store from './store';
import VTC_Page from './components/VTC_Page';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="body">
          <header className="Fade-in">
            <img src={dispersive} alt="logo" style={{ marginTop: "9%", marginBottom: "1.5%" }} />
          </header>
          <div>
            <VTC_Page />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
