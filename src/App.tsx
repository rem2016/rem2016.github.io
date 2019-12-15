import React from 'react';
import DevHome from './DevHome';
import { Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={DevHome} />
      </Switch>
    </div>
  );
}

export default App;
