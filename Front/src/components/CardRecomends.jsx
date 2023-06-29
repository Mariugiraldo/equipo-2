import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faShower, faPersonWalkingWithCane, faCarrot, faBaseball, faStethoscope, faLocationDot, faHeart} from "@fortawesome/free-solid-svg-icons";
import { Rating } from "@mui/material";
import { useContextGlobal } from "./utils/global.constext";

import { Link } from "react-router-dom";
import FavoriteIcon from "./FavoriteIcon";

export const CardRecomends = ({ number, image, type, name, characteristics, city, address, detail, capacity, basicPrice, rating, favorite}) => {
  console.log('favorite', favorite);
  
  if (!image) {
    return image;
  }

  const { loggedUser } = useContextGlobal();

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


  return (
    <div className="card-recomends">

      <div className="card-content">
        {loggedUser == null ? null : <FavoriteIcon pdcId={number} initialState={favorite}/>}
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
