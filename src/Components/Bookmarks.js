import { Link } from "react-router-dom";
import "./PokemonListing.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../Store/reducer/commonSlice";

function Bookmarks() {
  const [pokemonsList, setPokemonsList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    setPokemonsList(JSON.parse(localStorage.getItem("pokemons")));
    dispatch(setLoading(false));
  }, []);

  return (
    <div className="pokemon-listing">
      <div className="all-listing">
        <div className="pole"></div>
        <div className="heading">My Favorites</div>
      </div>
      <div className="row m-0 list-row pb-5 h-100">
        {Object.keys(pokemonsList).length > 0 &&
          Object.keys(pokemonsList).map((d, i) => {
            return (
              <div className="col-md-2 list-col" key={"pokemon" + i}>
                <Link
                  to={"/pokemons/" + pokemonsList[d]}
                  className="list-container"
                >
                  <div className="img-container">
                    <img
                      src={
                        process.env.REACT_APP_SPRITES_BASE_URL +
                        "/pokemon/" +
                        d +
                        ".png"
                      }
                      alt="dumyImage"
                    />
                  </div>
                  <span>{pokemonsList[d]}</span>
                </Link>
              </div>
            );
          })}
        {Object.keys(pokemonsList).length === 0 && (
          <div className="h-100 fav-pokemons">No Favorites Available</div>
        )}
      </div>
    </div>
  );
}

export default Bookmarks;
