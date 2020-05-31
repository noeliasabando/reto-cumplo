import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomeContainer from './components/HomeContainer/HomeContainer';
import * as serviceWorker from './serviceWorker';


const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={HomeContainer} />
      </Switch>
    </BrowserRouter>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.unregister();
