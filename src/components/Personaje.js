import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";

const Personaje = ({
  personaje,
  showAlertAddFavorito,
  showAlertRemoveFavorito,
}) => {
  const { listFilms } = useSelector((state) => state.app);
  const [infoPersonaje, actualizarInfoPersonaje] = useState({});
  const [participaciones, actualizarParticipaciones] = useState([]);
  const [especie, actualizarEspecie] = useState({});
  const [hogarNacimiento, actualizarHogarNacimiento] = useState({});
  const [isFav, actulizarIsFav] = useState(null);
  const [loading, actualizarLoading] = useState(true);

  useEffect(() => {
    getPersonaje();
    // eslint-disable-next-line
  }, []);

  const getPersonaje = async () => {
    const resultado = await axios.get(personaje);
    //console.log(resultado);
    if (resultado.status === 200) {
      actualizarInfoPersonaje(resultado.data);
      let existeItem = false;
      let dataStorage = JSON.parse(localStorage.getItem("favoritos"));
      if (dataStorage) {
        dataStorage.map((fav) => {
          if (fav.infoPersonaje.name === resultado.data.name)
            return (existeItem = true);
          return fav;
        });
        actulizarIsFav(existeItem);
      }
      //getFilms(resultado.data.films);
      await getSpecie(resultado.data);
      //getHomeworld(resultado.data.homeworld);
    }
  };

  const getSpecie = async (data) => {
    if (data.species[0]) {
      const resSpecie = await axios.get(data.species[0]);
      //console.log(resSpecie)
      if (resSpecie.status === 200) {
        actualizarEspecie(resSpecie.data);
        getHomeworld(data);
      }
    } else {
      getHomeworld(data);
    }
  };

  const getHomeworld = async (data) => {
    if (data.homeworld) {
      const resHomeworld = await axios.get(data.homeworld);
      if (resHomeworld.status === 200) {
        actualizarHogarNacimiento(resHomeworld.data);
        getFilms(data);
      }
    } else {
      getFilms(data);
    }
  };

  const getFilms = async (data) => {
    const aux = [];
    await data.films.forEach(async (url) => {
      listFilms.forEach((film) => {
        if (url === film.url) {
          aux.push({
            episode_id: film.episode_id,
            title: film.title,
          });
        }
      });
    });
    await actualizarParticipaciones(aux);
    await setTimeout(() => {
      actualizarLoading(false);
    }, 2000);
  };

  const addFavoritos = () => {
    let existeItem = false;
    let dataStorage = JSON.parse(localStorage.getItem("favoritos"));
    if (dataStorage) {
      dataStorage.map((fav) => {
        if (fav.infoPersonaje.name === infoPersonaje.name)
          return (existeItem = true);
        return fav;
      });
      if (existeItem) {
        console.log("ya existe ");
      } else {
        dataStorage.push({
          infoPersonaje,
          participaciones,
          especie,
          hogarNacimiento,
        });
        localStorage.setItem("favoritos", JSON.stringify(dataStorage));
      }
    } else {
      localStorage.setItem(
        "favoritos",
        JSON.stringify([
          {
            infoPersonaje,
            participaciones,
            especie,
            hogarNacimiento,
          },
        ])
      );
    }
    actulizarIsFav(true);
    setTimeout(() => {
      showAlertAddFavorito(infoPersonaje.name);
    }, 500);
  };

  const removeFavorito = (name) => {
    let dataStorage = JSON.parse(localStorage.getItem("favoritos"));
    let nuevosFavoritos = dataStorage.filter((fav) => {
      return fav.infoPersonaje.name !== name;
    });

    actulizarIsFav(false);
    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
    setTimeout(() => {
      showAlertRemoveFavorito(infoPersonaje.name);
    }, 500);
  };

  return (
    <div className="row">
      <div className="col mx-auto p-2">
        <div className="card cardPersonaje">
          {loading ? (
            <Spinner />
          ) : (
            <Fragment>
              <div className="card-title namePersonaje">
                {infoPersonaje.name}
              </div>
              <hr className="divider"></hr>
              <div className="col-12 pl-4">
                <p className="textTipo">
                  species:{" "}
                  <span className="textDetalle">
                    {Object.keys(especie).length !== 0
                      ? especie.name.toUpperCase()
                      : "HUMAN"}
                  </span>
                </p>
                <p className="textTipo">
                  homeworld:{" "}
                  <span className="textDetalle">
                    {Object.keys(hogarNacimiento).length !== 0
                      ? hogarNacimiento.name.toUpperCase()
                      : null}
                  </span>
                </p>
                <p className="textTipo">
                  population:{" "}
                  <span className="textDetalle">
                    {Object.keys(hogarNacimiento).length !== 0
                      ? hogarNacimiento.population
                      : null}
                  </span>
                </p>
                <p className="mb-0 textTipo">appears in:</p>
                {participaciones.length !== 0
                  ? participaciones.map((participacion) => (
                      <p
                        key={participacion.episode_id}
                        className="textParticipaciones"
                      >
                        {" "}
                        - {participacion.title.toUpperCase()}
                      </p>
                    ))
                  : null}
              </div>
              <div className="card-body text-center">
                {isFav ? (
                  <button
                    className="btn mx-auto btnRemoveFavorito"
                    onClick={() => removeFavorito(infoPersonaje.name)}
                  >
                    Remove favorite
                  </button>
                ) : (
                  <button
                    className="btn mx-auto btnFavoritos"
                    onClick={() => addFavoritos()}
                  >
                    Add to favorites
                  </button>
                )}
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Personaje;

//#337986 #243a5a  #2b4268  #1d324e
//#070808
