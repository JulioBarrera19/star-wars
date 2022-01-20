import React, {useEffect, useState, Fragment} from 'react';
import Header  from './Header';

const Favoritos = () => {
    const [favoritos, actualizarFavoritos] = useState([]);
    const [nuevoStorage, actualizarnuevoStorage] = useState();
    const [alertaRemove, actualizarAlertaRemove]= useState({
        mostrar: false,
        name: 'holaa'
    });

    useEffect(()=>{
        let storageFavoritos = JSON.parse(localStorage.getItem('favoritos'));
        if(storageFavoritos)
            actualizarFavoritos(storageFavoritos);
    },[nuevoStorage])

    const removeFavorito = (name) => {
        let nuevosFavoritos = favoritos.filter(fav =>{
            return fav.infoPersonaje.name !== name
        });

        actualizarnuevoStorage(nuevosFavoritos);
        localStorage.setItem('favoritos',JSON.stringify(
            nuevosFavoritos
        ));
        setTimeout(() => {
            actualizarAlertaRemove({
                mostrar: true,
                name
            });
        }, 500);

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
            />
            <div className="row containerFavs">
                <div className="col-12 titleFavoritos">
                    <h3>Favorite characters</h3>
                </div>
                {favoritos.length !== 0 ?
                    favoritos.map((favorito, index) =>(
                        <div key={index} className="col-12 col-sm-12 col-md-4 col-lg-4 px-5 pb-5">
                            <div className="card cardPersonaje">
                                <div className="card-title namePersonaje">
                                    {favorito.infoPersonaje.name}
                                </div>
                                <hr className="divider"></hr>
                                <div className="col-12 pl-4">
                                    <p className="textTipo">species: <span className="textDetalle">{Object.keys(favorito.especie).length !== 0 ? favorito.especie.name.toUpperCase() :null}</span></p>
                                    <p className="textTipo">homeworld: <span className="textDetalle">{Object.keys(favorito.hogarNacimiento).length !== 0 ? favorito.hogarNacimiento.name.toUpperCase() : null}</span></p>
                                    <p className="textTipo">population: <span className="textDetalle">{Object.keys(favorito.hogarNacimiento).length !== 0 ? favorito.hogarNacimiento.population : null}</span></p> 
                                    <p className="mb-0 textTipo">appears in:</p>
                                    {favorito.participaciones.length !== 0?
                                        favorito.participaciones.map(participacion =>(
                                            <p key={participacion.episode_id} className="textParticipaciones"> - {participacion.title.toUpperCase()}</p>
                                        ))
                                    :null}
                                </div>
                                <div className="card-body text-center">
                                    <button className="btn mx-auto btnRemoveFavorito" onClick={() => removeFavorito(favorito.infoPersonaje.name)}>
                                        Remove favorite
                                    </button>
                                </div>

                            </div>
                            
                        </div>
                    ))
                :<div className="col-6 mt-4 mx-auto">
                    <div className="card mensajeSinFav">
                        <p className="mx-auto my-auto">You haven't added any favourites yet</p>
                    </div>
                </div>  
                }
            </div>
            {alertaRemove.mostrar?
                <div className="alertaRemove">{alertaRemove.name} is no longer part of your favourites</div>
            :null}
        </Fragment> 
     );
}
 
export default Favoritos;