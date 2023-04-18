import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import api from "../../services/api";
import "./movie-info.css";

// https://api.themoviedb.org/3/movie/585245?api_key=e230d70de46c8bc751c0436148455bde

function Movie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovie() {
      await api
        .get(`/movie/${id}`, {
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
          navigate("/", { replace: true });
        });
    }
    loadMovie();

    return () => {
      console.log("Componente desmontado");
    };
  }, [id, navigate]);

  function saveMovie() {
    const myList = localStorage.getItem("@reactmovies");

    let savedMovies = JSON.parse(myList) || [];

    const hasMovie = savedMovies.some(
      (savedMovie) => savedMovie.id === movie.id
    );

    if (hasMovie) {
      toast.warn("Esse filme já está na sua lista!");
      return;
    }

    savedMovies.push(movie);
    localStorage.setItem("@reactmovies", JSON.stringify(savedMovies));
    toast.success("Filme salvo com sucesso!");
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    );
  }

  return (
    <div class="teste">
      <div className="banner">
        <div className="banner-info">
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <span>
            <ion-icon name="hourglass-outline"></ion-icon>
            {movie.runtime} min
          </span>
          <span>
            <ion-icon name="calendar-clear"></ion-icon>
            {movie.release_date.slice(0, 4)}
          </span>
        </div>
        <div className="banner-img">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.title}
          />
        </div>
      </div>
      <div className="filme-info">
        <div class="area-banner">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
          />
        </div>

        <div class="area-info">
          <h3>Sinopse</h3>
          <p>{movie.overview}</p>
          <ul key={movie.id}>
            <li>
              Genero: {movie.genres.map((genero) => genero.name).join(", ")}
            </li>
            <li>Avaliação: {movie.vote_average.toFixed(1)}/10</li>
            <li>
              Produção: <img src={`https://image.tmdb.org/t/p/original/${movie.production_companies[0].logo_path}`}></img>
            </li>
            <li></li>
            <li></li>
          </ul>
          <div className="area-buttons">
            <button onClick={saveMovie}>Salvar</button>
            <button>
              <a
                href={`https://youtube.com/results?search_query=Trailer+${movie.title}`}
                target="blank"
                rel="external"
              >
                Trailer
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;
