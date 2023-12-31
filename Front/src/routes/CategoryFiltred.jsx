import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {CardRecomends} from "../components/CardRecomends";
import Stack from '@mui/material/Stack';
import { Button, Pagination } from "@mui/material";


export const CategoryFiltred = () =>  {
  const { id} = useParams();

  const [category, setCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const savedUser = localStorage.getItem('userConnected');

  useEffect(() => {
    const getCategory = async () => {
      try {
        let loggedUserParams = '';
        if(savedUser != undefined && savedUser != null){
          const userObj = JSON.parse(savedUser);
          loggedUserParams = `?userId=${userObj.id}`; 
        }
        
        
        const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/petDayCare/category/${id}${loggedUserParams}`;
        const res = await fetch(url);
        const data = await res.json();
        setCategory(data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    getCategory();
  }, [id]);

  // Determina la cantidad de tarjetas a mostrar en función del tamaño de la pantalla
  let cardsPerRow =10;

  // Cantidad de tarjetas por página
  const cardsPerPage = cardsPerRow;

  // Número total de páginas
  const totalPages = Math.ceil(category.length / cardsPerPage);

  // Calcula el índice inicial y final de los items a mostrar en la página actual
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  // Obtén las tarjetas para la página actual
  const currentCards = category.slice(startIndex, endIndex);

  // Función para cambiar la página
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div className='space-section'>
      <div className= 'categories2'>
        <div>
          <Link to={"/category/1"}>
            <Button className="button-2"> Perros </Button>
          </Link>
          
        </div>
        <div>
          <Link to={"/category/2"}>
            <Button className="button-2"> Gatos </Button>
          </Link>
        </div>
        <div>
          <Link to={"/category/3"}>
            <Button className="button-2">Canarios</Button>
          </Link>
        </div>
        <div>
          <Link to={"/category/4"}>
            <Button className="button-2"> Conejos </Button>
          </Link>
        </div>
      </div>
      
      <img src="" alt="" />
      <h2>Alojamiento para {category.length > 0 ? category[0].type.title : ''}</h2>
      <p className="category-description">Esta es una lista de nuestras opciones de hospedajes especializados en {category.length > 0 ? category[0].type.title : ''}</p>

      <div className="render-cards-recommends">
        {currentCards.map((recommend) => (
          //<Link key={recommend.id} to={"/Detail/" + recommend.id}>
            <CardRecomends
              key={recommend.id}
              number={recommend.id}
              type={recommend.type.title}
              name={recommend.name}
              image={recommend.images}
              capacity={recommend.capacity}
              rating={recommend.rating}
              characteristics={recommend.characteristics}
              city={recommend.city}
              address={recommend.address}
              detail={recommend.detail}
              basicPrice={recommend.basicPrice}
              favorite={recommend.favorite}
            />
          //</Link>
        ))}
      </div>

      <Stack spacing={5} direction="row" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Stack>
    </div>
  );
}

