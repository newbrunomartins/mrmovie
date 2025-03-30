import {useEffect, useState} from 'react';
import {useParams, useNavigate, useNavigation} from 'react-router-dom';
import api from '../../services/api';
import './movie.css';


function Movie(){
   const { id } = useParams();
   const navigate = useNavigate();
   const [movie, setMovie] = useState({});
   const [loading, setLoading] = useState(true);

   useEffect(()=>{
    async function loadMovie(){
        await api.get(`/movie/${id}`,{ // Isso é uma promisse!
            params:{
                api_key: "434b3e90692dea358c00e31a229581d2",
                language: "pt-BR",
            }
        })
        .then((response)=>{ // Dando certo, faz isso
            setMovie(response.data);
            setLoading(false);
        })
        .catch(()=>{
            console.log("Movie não encontrado");
            navigate("/", { replace: true });
            return;
        })
    }

    loadMovie();

    return ()=>{
        console.log("Componente desmontado!")
    }

   }, [navigate, id]) // Os [] são chamados ARRAY DE DEPENDENCIAS.

   function salvarFilme(){
    const minhaLista = localStorage.getItem("@mrMovies");
    let filmesSalvos = JSON.parse(minhaLista) || [];
    const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === movie.id);

    if(hasFilme){
        alert("Este filme já está na lista!");
        return;
    }

    filmesSalvos.push(movie);
    localStorage.setItem("@mrMovies", JSON.stringify(filmesSalvos));
    alert("FILME SALVO!");
   }
   
   if(loading){
    return(
        <div className="movieInfo">
            <h1>Carregando Detalhes...</h1>
        </div>
    )
   }
   
   return(
    <div className="movieInfo">
        <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
        <div className="dadosMovie">
            <h1>{ movie.title } <span>{movie.vote_average.toFixed(1)} <span className="averageNote">/10</span></span></h1> 
            
            <h3 className='movieSinopse'>Sinopse:</h3>
            <p>{ movie.overview }</p>

            <div className="areaButtons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${movie.title}`}>Onde assistir</a>
                </button>
            </div>
        </div>
    </div>
    )
}

export default Movie;