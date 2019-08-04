import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Badge } from 'reactstrap';

const InfoSerie = ({ match }) => {
  const MODE = {
    INFO: 'INFO',
    EDIT: 'EDIT'
  };
  const STATUS = {
    ASSISTIDO: 'ASSISTIDO',
    PARA_ASSISTIR: 'PARA_ASSISTIR'
  };

  const [form, setForm] = useState({
    name: ''
  });
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState({});
  const [mode, setMode] = useState(MODE.INFO);
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState('');

  useEffect(() => {
    axios
      .get('/api/series/' + match.params.id)
      .then(res => {
        setData(res.data);
        setForm(res.data);
      });
  }, [match.params.id]);

  useEffect(() => {
    axios
      .get('/api/genres')
      .then(res => {
        setGenres(res.data.data);
        const genres = res.data.data;
        const encontrado = genres.find(value => data.genre === value.name);
        if (encontrado) {
          setGenreId(encontrado.id);
        }
      });
  }, [data]);

  const masterHeader = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  const onChangeGenre = evt => {
    setGenreId(evt.target.value);
  };

  const onChange = field => evt => {
    setForm({
      ...form,
      [field]: evt.target.value
    });
  };

  const seleciona = value => () => {
    setForm({
      ...form,
      status: value
    });
  };

  const save = () => {
    axios
      .put('/api/series/' + match.params.id, {
        ...form,
        genre_id: genreId
      })
      .then(res => setSuccess(true));
  };

  if (success) {
    return <Redirect to='/series' />;
  }

  return (
    <div>
      <header style={masterHeader}>
        <div className='h-100' style={{ background: 'rgba(0,0,0,.7)' }}>
          <div className='h-100 container'>
            <div className='row h-100 align-items-center'>
              <div className='col-3'>
                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster} />
              </div>
              <div className='col-8'>
                <h1 className='font-weight-light text-white'>{data.name}</h1>
                <div className='lead text-white'>
                  { data.status === STATUS.ASSISTIDO && <Badge color='success'>Assistido</Badge> }
                  { data.status === STATUS.PARA_ASSISTIR && <Badge color='warning'>Para assistir</Badge> }
                  Gênero: {data.genre}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className='container'>
        <button className='btn btn-primary' onClick={() => setMode(MODE.EDIT)}>Editar</button>
      </div>
      {
        mode === MODE.EDIT &&
        <div className='container'>
          <h1>Editar Série</h1>
          <button className='btn btn-primary' onClick={() => setMode(MODE.INFO)}>Cancelar Edição</button>
          <form>
            <div className='form-group'>
              <label htmlFor='name'>Nome</label>
              <input type='text' value={form.name} onChange={onChange('name')} className='form-control' placeholder='Nome da série' />
            </div>
            <div className='form-group'>
              <label htmlFor='comments'>Comentários</label>
              <input type='text' value={form.comments} onChange={onChange('comments')} className='form-control' placeholder='Comentários da série' />
            </div>
            <div className='form-group'>
              <label htmlFor='genre'>Gênero</label>
              <select className='form-control' onChange={onChangeGenre} value={genreId}>
                { genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>) }
              </select>
            </div>
            <div className='form-check'>
              <input className='form-check-input' checked={form.status === STATUS.ASSISTIDO} type='radio' name='status' id='assistido' value={STATUS.ASSISTIDO} onChange={seleciona(STATUS.ASSISTIDO)} />
              <label className='form-check-label' htmlFor='assistido'>
                Assistido
              </label>
            </div>
            <div className='form-check'>
              <input className='form-check-input' checked={form.status === STATUS.PARA_ASSISTIR} type='radio' name='status' id='paraAssistir' value={STATUS.PARA_ASSISTIR} onChange={seleciona(STATUS.PARA_ASSISTIR)} />
              <label className='form-check-label' htmlFor='paraAssistir'>
                Para assistir
              </label>
            </div>
            <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
          </form>
        </div>
      }
    </div>
  );
};

export default InfoSerie;
