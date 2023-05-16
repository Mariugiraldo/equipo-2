import { Route, Routes, Navigate } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Home } from "./routes/Home";
import Register from "./routes/Register";
import Login from "./routes/Login";
import CategoryPerros from "./routes/CategoryPerros";
import CategoryGatos from "./routes/CategoryGatos";
import CategoryCanarios from "./routes/CategoryCanarios";
import ProductRegister from "./routes/ProductRegister";
import { Footer } from "./components/footer";

function App() {
    return (
        <div className="App">
            <NavBar/>
            <div class="container">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/Perros" element={<CategoryPerros/>}/>
                <Route path="/Gatos" element={<CategoryGatos/>}/>
                <Route path="/Canarios" element={<CategoryCanarios/>}/>
                <Route path="/Admin" element={<ProductRegister/>}/>
            </Routes>
            </div>
            <Footer/>
        </div>
        
    );
}

export default App;