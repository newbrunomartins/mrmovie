import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css';

// /movie/now_playing?api_key=434b3e90692dea358c00e31a229581d2&language=pt-BR



function Home(){

    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{

        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params:{
                    api_key: "434b3e90692dea358c00e31a229581d2",
                    language: "pt-BR",
                    page: 1,

                }
            }) // ROTA DO FILME
            //console.log(response.data.results.slice(0,10));
            setFilmes(response.data.results.slice(0,10))
            setLoading(false);
        }

        loadFilmes();

    }, [])

    if(loading){
        return(
            <div className='loading'>
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return(
        <div>
            <h1>Bem vindo a página inicial!</h1>
            <div className='container'>
                <div className='listMovie'>
                    {filmes.map((filmes)=>{
                        return(
                            <article key={filmes.id}>
                                <span>{filmes.release_date ? new Date(filmes.release_date).getFullYear() : 'Data não disponível'}</span>
                                <img src={`https://image.tmdb.org/t/p/original/${filmes.poster_path}`} alt={filmes.title} />
                                <Link to={`/Movie/${filmes.id}`}>Acessar</Link>
                            </article>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default Home;