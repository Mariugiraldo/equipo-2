import React, { useState } from "react";

const FormUser = () => {
    const [user, setUser] = useState({
        name:'',
        lastName:'',
        cellPhone:'',
        address:'',
        email:'',
        password:'',
        type:''
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        if (user.name.length > 5) {
            alert(`Hi ${user.name}, your account has been successfully created.`)
            setUser({
                name:'',
                lastName:'',
                cellPhone:'',
                address:'',
                email:'',
                password:'',
                type:''
            })
            console.log(user);
        } else {
            alert('Please check the information provided')
        }
    }

    return (
        <div>
            <form className="sectionForm" onSubmit={handleSubmit}>
                <label>Nombre: </label>
                <input type="text" value={user.name} onChange={(e) => setUser({...user, name: e.target.value})}/>
                <br/>
                <label>Apellido: </label>
                <input type="text" value={user.lastName} onChange={(e) => setUser({...user, lastName: e.target.value})}/>
                <br/>
                <label>Celular: </label>
                <input type="text" value={user.cellPhone} onChange={(e) => setUser({...user, cellPhone: e.target.value})}/>
                <br/>
                <label>Direccion: </label>
                <input type="text" value={user.address} onChange={(e) => setUser({...user, address: e.target.value})}/>
                <br/>
                <label>Email: </label>
                <input type="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})}/>
                <br/>
                <label>Contraseña: </label>
                <input type="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})}/>
                <br/>
                <label>Tipo de Usuario: </label>
                <select name="type" onChange={(e) => setUser({...user, type: e.target.value})}>
                    <option selected hidden>--- Elige una Opcion ---</option>
                    <option value="customer">Cliente</option>
                    <option value="manager">Administrador</option>
                </select>

                <br/>
                <button>Send</button>
            </form>
        </div>
    );
};

export default FormUser