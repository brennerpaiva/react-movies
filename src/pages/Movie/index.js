import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api';
import './movie-info.css'

// https://api.themoviedb.org/3/movie/585245?api_key=e230d70de46c8bc751c0436148455bde


function Movie() {
  const { id } = useParams();
  const navigate = useNavigate();

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
          setMovie(response.data);
          setLoading(false);
      })
      .catch(() => {
        console.log("Filme não encontrado");
        navigate("/", {replace: true});
      })
    }
    loadMovie()

    return () => {
      console.log("Componente desmontado");
    }
  }, [id, navigate])

  function saveMovie() {
    const myList = localStorage.getItem("@reactmovies");

    let savedMovies = JSON.parse(myList) || [];

    const hasMovie = savedMovies.some( ( savedMovie ) => savedMovie.id === movie.id);

    if(hasMovie) {
      alert("Filme ja foi salvo");
      return;
    }

    savedMovies.push(movie)
    localStorage.setItem("@reactmovies", JSON.stringify(savedMovies))
    alert("Filme salvo com sucesso")

  }

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

      <strong> Genero: {movie.genres[0].name}</strong>
      <strong>Avaliação: {movie.vote_average}/10</strong>

      <div className="area-buttons">
        <button onClick={saveMovie}>Salvar</button>
        <button>
          <a href={`https://youtube.com/results?search_query=Trailer+${movie.title}`} target='blank' rel='external'>Trailer</a>
        </button>
      </div>
    </div>
  );
}

export default Movie;
