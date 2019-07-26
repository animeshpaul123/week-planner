import React from 'react';
import './App.css';
import Layout from './hoc/layout'
import 'bootstrap/dist/css/bootstrap.min.css';
import DashBuilder from './container/dashBuilder';
import Toolbar from './component/Naavigation/Toolbar/Toolbar';
import { Route, Switch } from 'react-router-dom';
import Error from './component/Error/Error';
import Landing from './component/landing/landing';

function App() {
  return (
    <div className="App">
      <Toolbar />
        <Switch>
          <Route path="/contact" component={Error}/>
          <Route path="/" exact render={() => {
            return (
              <React.Fragment>
                <Landing />
                <Layout>
                  <DashBuilder />
              </Layout>
              </React.Fragment>
            )
          }}/>
        </Switch>
    </div>
  );
}

export default App;
