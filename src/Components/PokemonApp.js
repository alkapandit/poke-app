import { NavLink, Route, Routes } from "react-router-dom";
import "./PokemonApp.css";
import Search from "./Search";
import PokemonListing from "./PokemonListing";
import PokemonDetails from "./PokemonDetails";
import Bookmarks from "./Bookmarks";
import { useSelector } from "react-redux";

function PokemonApp() {
  const { isMainLoading } = useSelector((state) => state.common);

  return (
    <div className="row m-0 admin-panel">
      <div className="col-md-2 nav-container">
        <h4>
          <span>POKE</span>APP
        </h4>
        <div className="nav-wrapper">
          <p>Pokemon Panel</p>
          <ul>
            <li>
              <NavLink to="/search">
                <i className="fa-solid fa-magnifying-glass"></i>Search
              </NavLink>
            </li>
            <li>
              <NavLink to="/pokemons">
                <i className="fa-solid fa-dragon"></i>Pokemons
              </NavLink>
            </li>
            <li>
              <NavLink to="/bookmarks">
                <i className="fa-solid fa-bookmark"></i>
                Bookmarks
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="col-md-10 h-100"
        style={{ overflowY: "scroll" }}
        id="components-container"
      >
        {isMainLoading && (
          <div className="loading-content">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/pokemons" element={<PokemonListing />} />
          <Route path="/pokemons/:name" element={<PokemonDetails />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </div>
    </div>
  );
}
export default PokemonApp;
