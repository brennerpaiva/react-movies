import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Erro from "./pages/Erro";
import Favorites from "./pages/Favorites";
import Search from "./pages/Search";

import Header from "./components/Header";
import Footer from "./components/Footer";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/search" element={<Search />} />

        <Route path="*" element={<Erro />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default RoutesApp;
