import React, {useState, useEffect, Fragment} from 'react';
import Personaje from './Personaje';
import Header  from './Header';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getFilmById } from '../store/app.slice';

const Detalle = (props) => {
    const {filmSelect} = useSelector(state => state.app);
    const dispatch = useDispatch();
    const [alertaAdd, actualizarAlertaAdd] = useState({
        mostrar: false,
        name: ''
    });
    const [alertaRemove, actualizarAlertaRemove]= useState({
        mostrar: false,
        name: ''
    });
    const {id} = useParams();
    
    useEffect(()=>{
        dispatch(getFilmById(id));
        // eslint-disable-next-line 
    },[]);

    const showAlertAddFavorito = (name) =>{
        actualizarAlertaAdd({
            mostrar: true,
            name
        });

        setTimeout(() => {
            actualizarAlertaAdd({
                mostrar: false,
                name: ''
            })
        }, 1500);
    }

    const showAlertRemoveFavorito = (name) =>{
        actualizarAlertaRemove({
            mostrar: true,
            name
        });

        setTimeout(() => {
            actualizarAlertaRemove({
                mostrar: false,
                name: ''
            })
        }, 1500);
    }

    return ( 
        <Fragment>
            <Header
                showHome
                showFav
            />
            <div className="row containerDetalle">
                <div className="col-xs-8 col-sm-10 col-md-6 col-lg-6 resumenEpisodio">
                    <span className="titleEpisodio"><p>{filmSelect.episode_id+ ': '+ filmSelect.title?.toUpperCase()}</p></span>
                    <p>{filmSelect.opening_crawl}</p>
                </div>
                <div className="col-12 col-sm-12 col-md-5 col-lg-5 p-0 containerPersonaje">
                    {Object.keys(filmSelect).length !== 0 ?
                        filmSelect.characters.map( (personaje, index) => (
                            <Personaje 
                                key={index}
                                personaje = {personaje}
                                showAlertAddFavorito = {showAlertAddFavorito}
                                showAlertRemoveFavorito = {showAlertRemoveFavorito}
                            />
                        )):null
                    }
                </div>
            </div>
            {alertaAdd.mostrar ? 
                <div className="alertaAdd">{alertaAdd.name} added to favourites</div>
            :null}
            {alertaRemove.mostrar?
                <div className="alertaRemove"> {alertaRemove.name} is no longer part of your favourites</div>
            :null}
        </Fragment>
     );
}
 
export default Detalle;