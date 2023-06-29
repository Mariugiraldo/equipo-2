import React, { useEffect, useState } from "react";
import { Product } from "../components/Product.jsx";
import { useParams } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css";


const Details = () => {
      const [details, setDetails] = useState([]);
      const { id } = useParams();
      const [selectedDate, setSelectedDate] = useState(null);
      const savedUser = localStorage.getItem('userConnected');

      const getDetail = async () => {
            let loggedUserParams = '';
            if(savedUser != undefined && savedUser != null){
                  const userObj = JSON.parse(savedUser);
                  loggedUserParams = `?userId=${userObj.id}`; 
            }
            const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/petDayCare/detail/${id}${loggedUserParams}`;
            const res = await fetch(url);
            const data = await res.json();
            setDetails(data);
      };

      useEffect(() => {
            getDetail();
      }, []);

      useEffect(() => {
            // Guardar detalles en sessionStorage cuando details cambie
            sessionStorage.setItem("productDetail", JSON.stringify(details));
      }, [details]);

      console.log(details);

      return (
            <>
                  <div className="detail-container">
                        <Product
                              id={details.id}
                              name={details.name}
                              type={details.type}
                              capacity={details.capacity}
                              city={details.city}
                              address={details.address}
                              detail={details.detail}
                              image={details.images}
                              basicPrice={details.basicPrice}
                              features={details.characteristics}
                              houseRules={details.houseRules}
                              healthAndSecurity={details.healthAndSecurity}
                              cancellationPolicy={details.cancellationPolicy}
                              selectedDate={selectedDate}
                              rating={details.rating}
                              favorite={details.favorite}
                        />
                  </div>
            </>
      );
};
export default Details;