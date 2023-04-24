import { Link, useNavigate} from "react-router-dom";
import React, { useState } from "react";
import "./header.css";

function Header() {

    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();

    function handleChange(event) {
      setInputValue(event.target.value);
    }

    function handleClick() {

     if (!inputValue) return;

    navigate(`/search?q=${inputValue}`);
    setInputValue("");
    }

  return (
    <header>
      <div className="max-width">
        <Link className="logo" to="/">
          <ion-icon className="ico" name="logo-react"></ion-icon>
          <strong>REACT</strong>
          movies
        </Link>
        <div className="nav">
          <div className="search">
            <input
              id="input-movie"
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Pesquise por um filme"
            />
            <button onClick={handleClick}>
              <ion-icon name="search"></ion-icon>
            </button>
          </div>
          <Link className="favorites" to="/favorites">
            Meus Filmes
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
