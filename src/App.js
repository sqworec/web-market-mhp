import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainPage from "./pages/MainPage";
import Background from "./components/Background";
import ProductsPage from "./pages/ProductsPage";
import ContactsPage from "./pages/ContactsPage";
import AboutPage from "./pages/AboutPage";
import Header from "./components/Header";
import AddProductPage from "./pages/AddProductPage";

function App() {
    return (<>
        <Background/>
        <Header/>
        <Router>
            <div className="w-full">
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/products" element={<ProductsPage/>}/>
                    <Route path="/products/add" element={<AddProductPage/>}/>
                    <Route path="/contacts" element={<ContactsPage/>}/>
                    <Route path="/about" element={<AboutPage/>}/>
                </Routes>
            </div>
        </Router>
    </>);
}

export default App;
