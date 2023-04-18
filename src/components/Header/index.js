import { Link, useNavigate} from "react-router-dom";
import React, { useState } from "react";
import "./header.css";

function Header() {

    const [valorInput, setValorInput] = useState("");
    const navigate = useNavigate()

    function handleChange(event) {
      setValorInput(event.target.value);
    }

    function handleClick() {

     if(!valorInput) return

    navigate(`/search?q=${valorInput}`)

      console.log("O botão foi clicado e o valor do input é:", valorInput);
    }


  return (
    <header>
      <div className="max-width">
        <Link className="logo" to="/">
          React Movies
        </Link>
        <div className="search">
          <input
            id="meu-input"
            type="text"
            value={valorInput}
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
    </header>
  );
}

export default Header;
