import { useEffect, useState } from "react";
import api from "../../services/api";

//https://api.themoviedb.org/3/movie/now_playing?api_key=e230d70de46c8bc751c0436148455bde

function Home() {
    const [filmes, setFilmes] = useState([]);

    useEffect(()=>{
        async function loadMovies() {
            const response = await api.get("movie/now_playing", {
              params: {
                api_key: "e230d70de46c8bc751c0436148455bde",
                language: "pt-BR",
                page: 1,
              },
            })

            console.log(response.data.results);
        }

        loadMovies();
        
    }, [])

    return(
        <div>
            <h1>Bem vindo a home</h1>
        </div>
    )
}

export default Home;