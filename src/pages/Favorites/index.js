import { useEffect, useState } from "react";
import "./favorites.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const myList = localStorage.getItem("@reactmovies");
    setMovies(JSON.parse(myList) || []);
  }, []);

  function removeMovie(id) {
    let movieFilter = movies.filter( (item) => {
        return (item.id !== id)
    })

    setMovies(movieFilter)
    localStorage.setItem("@reactmovies", JSON.stringify(movieFilter));
    toast.success("Filme removido com sucesso")
  }

  return (
    <div className="fav">
      <h1>Meus Filmes</h1>
        {movies.length === 0 && <h3>Você não possui nenhum filme salvo :(</h3> }
      <ul>
        {movies.map((item) => {
          return (
            <li key={item.id}>
              <img
                src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                alt={item.title}
              ></img>
              <span>{item.title}</span>
              <div className="icons">
                <Link to={`/movie/${item.id}`}>
                  <ion-icon name="eye"></ion-icon>
                </Link>

                <button onClick={() => removeMovie(item.id)}>
                  <ion-icon name="trash"></ion-icon>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Favorites;
