import React, { Component } from 'react';
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { ContextGlobal } from "./utils/global.constext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




export class FavoriteIcon extends Component {
  state = { isFavorite: this.props.initialState };

  static contextType = ContextGlobal;

  setFavorite = () => {
    if(this.context.loggedUser != null){
      this.backendCall('POST', true);
    }
  };

  unsetFavorite = () => {
    if(this.context.loggedUser != null){
      console.log('delete fav');
       this.backendCall('DELETE', false);
    }
  };

  backendCall = (method, state) => {
    const favorite = { userId: this.context.loggedUser.id, petDayCareId: this.props.pdcId };
    console.log('fav: ', favorite);
    fetch(this.context.urlFavorites,
        {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(favorite)
        })
    .then((response) => {
      console.log('click response', response);
      if(response.status == 200){
        this.setState({ isFavorite: state });
      } else {
        console.error(response);
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isFavorite ? 
          (

            <FontAwesomeIcon
              icon={solidHeart}
              style={{ color: "red" }}
              className={`card-favorite-icon ${this.props.clazz}`}
              onClick={this.unsetFavorite}
              beat
            />
  
          ) : (
  
            <FontAwesomeIcon
              icon={faHeart}
              style={{ color: "#fff" }}
              className={`card-favorite-icon ${this.props.clazz}`}
              onClick={this.setFavorite}
            />
  
          )}
      </React.Fragment>
    );
  }
}

export default FavoriteIcon;
