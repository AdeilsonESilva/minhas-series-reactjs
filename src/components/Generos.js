import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Generos = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get('/api/genres')
      .then(res => setData(res.data.data))
      .catch(error => console.log('error on get genres: ', error));
  }, []);

  const deleteGenero = id => {
    axios
      .delete('/api/genres/' + id)
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
          <button className='btn btn-danger' onClick={() => deleteGenero(record.id)}>Remover</button>
          <Link to={'/generos/' + record.id} className='btn btn-warning'>Editar</Link>
        </td>
      </tr>
    );
  };

  if (!data || data.length === 0) {
    return (
      <div className='container'>
        <h1>Gêneros</h1>
        <Link to='/generos/novo' className='btn btn-primary'>Novo</Link>
        <div className='alert alert-warning' role='alert'>
          Você não possui gêneros criados.
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <h1>Gêneros</h1>
      <Link to='/generos/novo' className='btn btn-primary'>Novo</Link>
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

export default Generos;
