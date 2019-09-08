import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import TuneDetailed from './components/TuneDetailed/TuneDetailed';
import Search from './components/Search/Search';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <div className="title">Itunes Player</div>
        <Switch>
          <Route path="/" exact component={Search} />
          <Route path="/:tuneId" exact component={TuneDetailed} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
