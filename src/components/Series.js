import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Series = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get('/api/series')
      .then(res => setData(res.data.data))
      .catch(error => console.log('error on get seeries: ', error));
  }, []);

  const deleteSerie = id => {
    axios
      .delete('/api/series/' + id)
      .then(res => {
        if (res.status === 200) {
          const newData = data.filter(item => item.id !== id);
          setData(newData);
        }
      });
  };

  const renderLinha = record => {
    return (
      <tr key={record.id}>
        <th scope='row'>{record.id}</th>
        <td>{record.name}</td>
        <td>
          <button className='btn btn-danger' onClick={() => deleteSerie(record.id)}>Remover</button>
          <Link to={'/series/' + record.id} className='btn btn-warning'>Editar</Link>
        </td>
      </tr>
    );
  };

  if (!data || data.length === 0) {
    return (
      <div className='container'>
        <h1>Séries</h1>
        <Link to='/series/novo' className='btn btn-primary'>Novo</Link>
        <div className='alert alert-warning' role='alert'>
          Você não possui séries criadas.
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <h1>Séries</h1>
      <Link to='/series/novo' className='btn btn-primary'>Nova</Link>
      <table className='table table-dark'>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Nome</th>
            <th scope='col'>Ações</th>
          </tr>
          {data.map(renderLinha)}
        </thead>
        <tbody />
      </table>
    </div>
  );
};

export default Series;
