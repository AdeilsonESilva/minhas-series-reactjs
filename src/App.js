import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Generos from './components/Generos';
import NovoGenero from './components/NovoGenero';
import EditarGenero from './components/EditarGenero';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  return (
    <h1>Home</h1>
  );
};

const Ajuda = () => {
  return (
    <div>
      <h1>Ajuda</h1>
      <p>
        Rodar: node node_modules\minhas-series-server\index.js
      </p>
    </div>
  );
};

function App () {
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get('/api')
      .then(res => setData(res.data));
  }, []);
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/generos/novo' exact component={NovoGenero} />
          <Route path='/generos/:id' exact component={EditarGenero} />
          <Route path='/generos' exact component={Generos} />
          <Route path='/ajuda' exact component={Ajuda} />
        </Switch>
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </Router>
  );
}

export default App;
