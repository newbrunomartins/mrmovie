import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom'
import './bookmarks.css';


function Bookmarks(){
    const [movies, setMovies] = useState([]);

    useEffect(()=>{
        const minhaLista = localStorage.getItem("@mrMovies");
        setMovies(JSON.parse(minhaLista) || [])
    }, []);

    function excluirFilme(id){
        let filtroFilmes = movies.filter((item)=>{
            return (item.id !== id);
        });

        setMovies(filtroFilmes);
        localStorage.setItem("@mrMovies", JSON.stringify(filtroFilmes));
    }
    return(
        <div className="myMovies">
            <h1>Meus favoritos</h1>

            <ul>
                {movies.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                            <Link to={`/movie/${item.id}`}>Ver detalhes</Link>
                            <button className="garbage" onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
                
            </ul>
        </div>
    )
}

export default Bookmarks;