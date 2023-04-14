import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import './home.css'

//https://api.themoviedb.org/3/movie/now_playing?api_key=e230d70de46c8bc751c0436148455bde

function Home() {
    const [filmes, setFilmes] = useState([]);
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

            setFilmes(response.data.results.slice(0, 10));
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

    return(
        <div className="Container">
            <div className="lista-filmes">
                {filmes.map((filme) => {
                    return (
                      <article key={filme.id}>
                        <strong>{filme.title}</strong>
                        <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}  />
                        <Link to={`/filmes/${filme.id}`}>Acessar</Link>
                      </article>
                    );
                })}
            </div>
        </div>
    )
}

export default Home;