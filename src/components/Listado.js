import React, { useEffect, Fragment} from 'react';
import episodio1 from '../assets/episodio1.jpg'
import episodio2 from '../assets/episodio2.jpg'
import episodio3 from '../assets/episodio3.jpg'
import episodio4 from '../assets/episodio4.jpg'
import episodio5 from '../assets/episodio5.jpg'
import episodio6 from '../assets/episodio6.jpg'
import episodio7 from '../assets/episodio7.png'
import { Link } from 'react-router-dom';
import Spinner from './Spinner'
import Header  from './Header';
import { useSelector, useDispatch } from 'react-redux';
import { getFilms } from '../store/app.slice';

const Listado = () => {
    const {loading, listFilms} = useSelector(state => state.app);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getFilms());
        // eslint-disable-next-line 
    },[])

    const imagenPelicula = (episodio) => {
        switch(episodio) {
            case 1:
                return episodio1;
            case 2:
                return episodio2;
            case 3:
                return episodio3;
            case 4:
                return episodio4;
            case 5:
                return episodio5;
            case 6:
                return episodio6;
            case 7:
                return episodio7;
            default:
                return;
          }
    }

    return (  
        <Fragment>
            <Header
                showFav
            />
            <div className="row containerPeliculas">
            {
                loading ? <Spinner /> :
                listFilms.map((pelicula, index) =>(
                    <div key={pelicula.episode_id} className="col-sm-6 col-md-4 col-lg-4 colPeli">
                        <div className="card cardPelicula">
                            <img className="imgPelicula" src={imagenPelicula(pelicula.episode_id)} alt={pelicula.title}/>
                            <div className="card-body titlePersonaje ">
                                <h5 className="card-title colorTitle">{pelicula.title}</h5>
                                <hr className="divideTitle"></hr>
                            </div>
                            <div className="col detailsPelicula">
                                <p className="textPelicula">Episode {pelicula.episode_id}</p>
                                <p className="textPelicula">{pelicula.release_date.split('-')[0]}</p>
                                <p className="textPelicula">Directed by {pelicula.director}</p>
                                <p className="textPelicula">Produced by {pelicula.producer}</p>
                            </div>
                            <div className="card-body text-center pt-0 pb-2">
                                <hr className="divider"></hr>
                                <Link 
                                    className="btnVerPersonaje"
                                    to={{
                                        pathname: `/film/${index + 1}`,
                                    }}
                                >
                                    View Characters
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            
        </div>
        </Fragment>
        
    );
}
 
export default Listado;