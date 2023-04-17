import { Link } from 'react-router-dom';
import './header.css';

function Header() {
    return(
        <header>
            <div className='max-width'>
                <Link className='logo' to="/">React Movies</Link>
                <Link className='favorites' to='/favorites'>Meus Filmes</Link>
            </div>
        </header>
    )
}

export default Header;