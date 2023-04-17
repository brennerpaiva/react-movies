import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link, useSearchParams} from "react-router-dom";
import Header from "../../components/Header";
import "./search.css";


function Search() {
  const [searchParams] = useSearchParams();  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get("q");

  

  //https://api.themoviedb.org/3/search/movie?api_key=e230d70de46c8bc751c0436148455bde&language=pt-BR&query=vizinhos&page=1

  useEffect(() => {

    async function searchMovies() {
      const response = await api.get("search/movie", {
        params: {
          api_key: "e230d70de46c8bc751c0436148455bde",
          language: "pt-BR",
          query: query,
          page: 1,
        },
      });

      setMovies(response.data.results.slice(0, 20));
      setLoading(false);
    }

    searchMovies();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando filmes</h2>
      </div>
    );
  }

  return (
    <div className="Container">
      <h1>search</h1>
      <div className="lista-filmes">
        {movies.map((movie) => {
          return (
            <article key={movie.id}>
              <strong>{movie.title}</strong>
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
              />
              <Link to={`/movie/${movie.id}`}>Acessar</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Search;
