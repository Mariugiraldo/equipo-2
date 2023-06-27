import React, { useState, useEffect } from "react";
import { useContextGlobal } from '../components/utils/global.constext';
import Swal from 'sweetalert2';

export const FormNewCategory = () => {
    const { urlCategory } = useContextGlobal();

    const userConnected = JSON.parse(localStorage.getItem('userConnected')) || null; //Para validad el tipo de usuario, si no esta logeado no cargara la pagina

    const [categoryInDataBase, setCategoryInDataBase] = useState([]);
    const getAllCategoryDataBase = async () => {
        const res = await fetch(`${urlCategory}/all`);
        const data = await res.json();
        setCategoryInDataBase(data);
    };
    useEffect(() => {
        getAllCategoryDataBase();
    }, []);

    const [newCategory, setNewCategory] = useState({
        title: "",
        description: "",
        image: "",
        icon: ""
    });
    const [errors, setErrors] = useState({
        title: "",
        description: "",
        image: "",
        icon: ""
    });
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewCategory((prevCategory) => ({
            ...prevCategory,
            [name]: value
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ""
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const categoryExists = categoryInDataBase.some((category) =>
            category.title.toLowerCase() === newCategory.title.toLowerCase()
        );

        if (categoryExists) {
            Swal.fire({
                icon: 'error',
                title: 'La categoría elegida ya ha sido creada previamente, intenta con otra.',
            });
        } else {
            const urlPost = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/category`;

            // Validar los campos antes de enviar la solicitud
            let formIsValid = true;
            const newErrors = { ...errors };

            if (!newCategory.title.match(/^[a-zA-Z\s]+$/)) {
                formIsValid = false;
                newErrors.title = "Ingrese un nombre válido (solo letras)";
            }

            if (!newCategory.description || newCategory.description.trim() === "") {
                formIsValid = false;
                newErrors.description = "Ingrese una descripción válida";
            }

            if (!newCategory.image?.match(/^(ftp|http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/
            )) {
                formIsValid = false;
                newErrors.image = "Ingrese una URL de imagen válida";
            }
            if (!newCategory.icon?.match(/^(ftp|http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/
            )) {
                formIsValid = false;
                newErrors.icon = "Ingrese una URL de icon válida";
            }

            if (formIsValid) {
                // Enviar los datos de newCategory al endpoint de creación en el backend
                fetch(urlPost, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newCategory)
                })
                    .then((response) => response.json())
                    .then(() => {
                        Swal.fire({
                            text: "¡Categoría creada exitosamente!",
                            icon: "success",
                        });
                        setNewCategory({
                            title: "",
                            description: "",
                            image: "",
                            icon: ""
                        });
                    })
                    .catch((error) => {
                        console.error("Error creating category:", error);
                    });
            } else {
                setErrors(newErrors);
            }
        }
    };

    return (

        <div className=" space-section">

            
            <div className="titles-new-category">
                <h2 className="title-form-new-category">{userConnected?.type !== "Manager" ? "Página no encontrada" : "Crear nueva categoría"}</h2>
                <h3 className="instructions-form-new-category">{userConnected?.type !== "Manager" ? "" : "Ingresa los campos para crear tu nueva categoría"}</h3>
            </div>
            

            {userConnected?.type === "Manager" && (
                <form onSubmit={handleSubmit} className="form-new-category" >
                    <div className="title-input-container">
                        <label htmlFor="title">Titulo:</label>
                        <input
                            className="input-category"
                            type="text"
                            id="title"
                            name="title"
                            value={newCategory.title}
                            onChange={handleInputChange}
                        />
                        {errors.title && <span className="error">{errors.title}</span>}
                    </div>
                    <div className="description-input-container">
                        <label htmlFor="description">Descripción:</label>
                        <input
                            className="input-category"
                            type="text"
                            id="description"
                            name="description"
                            value={newCategory.description}
                            onChange={handleInputChange}
                        />
                        {errors.description && (
                            <span className="error">{errors.description}</span>
                        )}
                    </div>
                    <div className="image-input-container">
                        <label htmlFor="image">URL imagen:</label>
                        <input
                            className="input-category"
                            type="text"
                            name="image"
                            id="image"
                            value={newCategory.image}
                            onChange={handleInputChange}
                        />
                        {errors.image && <span className="error">{errors.image}</span>}
                    </div>
                    <div className="icon-input-container">
                        <label htmlFor="icon">URL icono:</label>
                        <input
                            className="input-category"
                            type="text"
                            name="icon"
                            id="icon"
                            value={newCategory.icon}
                            onChange={handleInputChange}
                        />
                        {errors.icon && <span className="error">{errors.icon}</span>}
                    </div>
                    <div className="button-new-category-container">
                        <button 
                            type="submit"
                            className="button-form-new-category button-1"
                            role="button"
                        >
                            Crear categoría
                        </button>
                    </div>
                        
                </form>
            )}
        </div>
    );
};
