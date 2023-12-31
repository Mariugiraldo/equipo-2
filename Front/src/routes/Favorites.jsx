import React, { useState, useEffect } from "react";
import { CardRecomends } from "../components/CardRecomends";
import { useContextGlobal } from "../components/utils/global.constext";

export const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const {urlPostProducts} = useContextGlobal();
    const savedUser = localStorage.getItem('userConnected');

    const fetchFavorites = () => {
        if(savedUser != undefined && savedUser != null){
            const userObj = JSON.parse(savedUser);
            const url = `${urlPostProducts}/favorites?userId=${userObj.id}`; 
            fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => response.json())
            .then((data) => {
                setFavorites(data);
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
        }   
    };
    useEffect(() => {
        fetchFavorites();
    }, []);

//   <h3 className="h3-no-favorites">Aún no se han agregado hospedajes a favoritos.</h3>;
    console.log(favorites);
    return (
        <div className="space-section favorites-container">
            <h2>Favorites</h2>
            
            {favorites.length === 0 ? (
                <h3 className="h3-no-favorites">Aún no se han agregado hospedajes a favoritos.</h3>
            ) : (
                <div className="render-cards-recommends">
                    {favorites.map((petDayCare) => {
                        return (
                            <CardRecomends
                                key={petDayCare?.id}
                                number={petDayCare?.id}
                                type={petDayCare?.type.title}
                                name={petDayCare?.name}
                                image={petDayCare?.images}
                                capacity={petDayCare?.capacity}
                                rating={petDayCare?.average}
                                city={petDayCare?.city.name}
                                address={petDayCare?.address}
                                detail={petDayCare?.detail}
                                basicPrice={petDayCare?.basicPrice}
                                characteristics={petDayCare?.characteristics}
                                favorite={petDayCare?.favorite}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};