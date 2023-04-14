import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import api from '../../services/api';
import './movie-info.css'

// https://api.themoviedb.org/3/movie/585245?api_key=e230d70de46c8bc751c0436148455bde


function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function loadMovie() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: "e230d70de46c8bc751c0436148455bde",
          language: "pt-BR",
        },
      })
      .then((response) => {
          setMovie(response.data)
          setLoading(false)
      })
      .catch(() => {
        console.log("Filme nao encontado");
      })
    }
    loadMovie()

    return () => {
      console.log("Componente desmontado")
    }
  }, [])

  if(loading) {
    return(
      <div className='filme-info'>
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }

  return (
    <div className="filme-info">
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title}
      />
      <h3>Sinopse</h3>
      <span>{movie.overview}</span>

      <strong>Avaliação: {movie.vote_average}/10</strong>

      <div className='area-buttons'>
        <button>Salvar</button>
        <button>
          <a href='#'>Trailer</a>
        </button>
      </div>

    </div>
  );
}

export default Movie;
