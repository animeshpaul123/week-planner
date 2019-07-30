import React from 'react';
import './App.css';
import Layout from './hoc/layout'
import 'bootstrap/dist/css/bootstrap.min.css';
import DashBuilder from './container/dashBuilder';

function App() {
  return (
    <div className="App">
      <Layout>
        <DashBuilder />
      </Layout>
    </div>
  );
}

export default App;
