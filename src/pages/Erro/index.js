import { Link } from "react-router-dom";
import './erro.css' 


function Erro(){
    return(
        <div className="notFound">
            <h1>404</h1>
            <span>Oops! Algo não esta certo!</span>
            <Link to="/">Veja todos os filmes</Link>
        </div>
    )
}

export default Erro;