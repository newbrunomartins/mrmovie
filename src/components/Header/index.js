import './header.css';
import { Link, link } from 'react-router-dom';


function Header(){
    return(
        <header>
            <Link className='logo' to="/" >MR MOVIE</Link>
            <Link className='bookmarks' to='/bookmarks' >Meus Filmes</Link> 
        </header>
    )
}

export default Header;