import { Link } from 'react-router-dom';
import './header.css';

function Header() {
    return(
        <header>
            <Link className='logo' to="/">React Movies</Link>
            <Link className='favorites' to='/favorites'>Meus Filmes</Link>
        </header>
    )
}

export default Header;