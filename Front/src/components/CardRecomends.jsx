import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faShower, faPersonWalkingWithCane, faCarrot, faBaseball, faStethoscope, faLocationDot, faHeart} from "@fortawesome/free-solid-svg-icons";
import {  faHeart as fasHeart} from "@fortawesome/free-regular-svg-icons";
import { Grid, Rating } from "@mui/material";
import { useContextGlobal } from "./utils/global.constext";

import { Link } from "react-router-dom";

export const CardRecomends = ({ number, image, type, name, characteristics, city, address, detail, capacity, basicPrice, rating, }) => {
  const { favorites, setFavorites, isFavorite, setIsFavorite } =
    useContextGlobal();
  const userConnected = JSON.parse(localStorage.getItem('userConnected')) || null;

  if (!image) {
    return image;
  }
  const renderCharacteristics = () => {
    const icons = {
      Paseo: faPersonWalkingWithCane,
      Baño: faShower,
      Alimentación: faCarrot,
      Veterinaria: faStethoscope,
      Entrenamiento: faBaseball,
    };

    return characteristics.map((option, index) => {
      const icon = icons[option];
      if (
        icon &&
        (option === "Paseo" ||
          option === "Baño" ||
          option === "Alimentación" ||
          option === "Veterinaria" ||
          option === "Entrenamiento")
      ) {
        return (
          <span key={index}>
            <FontAwesomeIcon icon={icon} className="card-services-recommends" />
          </span>
        );
      }
    });
  };

  const truncateDetail = (text) => {
    if (text.length > 100) {
      return text.substring(0, 100) + "...";
    }
    return text;
  };

  const showRating = () => {
    return rating !== null && rating !== undefined;
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log("number:");
    console.log(number);
  };

  // const handleFavorite = async () => {

  //   //setIsFavorite(!isFavorite);

  //   const petDayCareId = {number}; 
  //   const userConnected = JSON.parse(localStorage.getItem('userConnected'));
  //   const userId = userConnected.id;

  //   if (userId) {
  //     const newFavorite = {
  //       idFavorite: 0,
  //       userId: parseInt(userId),
  //       petDayCareId: petDayCareId,
  //     };
  //     try {
  //         const response = await fetch('http://localhost:8080/api/v1/favorite/', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(newFavorite),
  //       });
  //       if (response.ok) {
  //         setFavorites([...favorites, newFavorite]);
  //         setIsFavorite(!isFavorite);
  //       } else {
  //         console.error('Error al agregar el producto a favoritos');
  //       }
  //     } catch (error) {
  //       console.error('Error al hacer la solicitud POST de favoritos:', error);
  //     }
  //   } else {
  //     console.error('No se encontró el userId en el localStorage');
  //   }

  // };

  return (
    <div className="card-recomends">

      <div className="card-content">
        {isFavorite ? (

          <FontAwesomeIcon
            icon={faHeart}
            style={{ color: "red" }}
            className="card-favorite-icon"
            onClick={handleFavorite}
            beat
          />

        ) : (

          <FontAwesomeIcon
            icon={fasHeart}
            style={{ color: "#fff" }}
            className="card-favorite-icon"
            onClick={handleFavorite}

          />

        )}
        <div className="left-card-content">
          <img
            className="card-image-recommends"
            src={image[0]}
            alt={type.title}
          />


        </div>
        <div className="right-card-content">
          <div className="card-head-recommends">
          <h3 className="card-title-recommends">{name}</h3>
          <div>
            {showRating() ? (
              <span className="card-head-recommends">
                <span className="rating-value">{rating.average}</span>
                <Rating
                  className="rating-value-star"
                  defaultValue={1}
                  max={1}
                  readOnly
                />
              </span>

            ) : null}
          </div>
          </div>

          <span className="card-category-recommends">
            Habilitado para: {capacity} {type.title}{" "}
          </span>
          <p className="card-location-recommends">
            <FontAwesomeIcon
              icon={faLocationDot}
              className="card-location-icon"
            />
            {city.name}, {address}
          </p>
          <span className="card-services-list-recommends">
            {renderCharacteristics()}
          </span>
          <p className="card-descrption-recommends">{truncateDetail(detail)}</p>
          <Link className="button-2" key={number} to={"/Detail/" + number}>
            <button className="button-2">Ver más</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
