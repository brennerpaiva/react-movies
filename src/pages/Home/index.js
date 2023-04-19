import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.css";

//https://api.themoviedb.org/3/movie/now_playing?api_key=e230d70de46c8bc751c0436148455bde


function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        async function loadMovies() {
            const response = await api.get("movie/now_playing", {
              params: {
                api_key: "e230d70de46c8bc751c0436148455bde",
                language: "pt-BR",
                page: 1,
              },
            })

            setMovies(response.data.results.slice(0, 20));
            setLoading(false)
        }

        loadMovies();
        
    }, [])

  
    if(loading){
        return(
            <div className="loading">
                <h2>Carregando filmes</h2>
            </div>
        )
    }



    return (
      <div className="container">
        <div class="title">
          <h1>Últimos Lançamentos</h1>
          <h2>Filmes</h2>
        </div>
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

export default Home;