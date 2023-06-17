import { Link } from "react-router-dom";
import "./PokemonListing.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useCallback } from "react";

function PokemonListing() {
  const [pokemonsList, setPokemonsList] = useState([]);
  const [offset, setOffset] = useState();
  const [totaloffset, setTotalOffset] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [totalPokemons, setTotalPokemons] = useState(-1);

  function getId(url) {
    let x = url.split("/");
    return x[x.length - 2];
  }

  const scrollEventHandler = useCallback(() => {
    let innerHeight = window.innerHeight;
    let scrollTop = document.querySelector("#components-container").scrollTop;
    let scrollHeight = document.querySelector(
      "#components-container"
    ).scrollHeight;
    if (
      innerHeight + scrollTop < scrollHeight ||
      isLoading ||
      (totalPokemons !== 0 && pokemonsList?.length >= totalPokemons)
    ) {
      return;
    }
    setOffset((offset) => offset + 60);
  }, [isLoading, pokemonsList, totalPokemons]);

  useEffect(() => {
    document
      .querySelector("#components-container")
      .addEventListener("scroll", scrollEventHandler);
    return () => {
      window.removeEventListener("scroll", scrollEventHandler);
    };
  }, [scrollEventHandler]);

  useEffect(() => {
    if (
      ((typeof offset === "number" &&
        typeof totaloffset === "undefined" &&
        offset === 0) ||
        (typeof offset === "number" &&
          typeof totaloffset === "number" &&
          offset === totaloffset + 60)) &&
      !isLoading &&
      (totalPokemons === -1 || pokemonsList?.length < totalPokemons)
    ) {
      setIsLoading(true);
      axios("pokemon", {
        method: "GET",
        params: {
          offset: offset,
          limit:
            totalPokemons === -1 || offset + 60 <= totalPokemons
              ? 60
              : totalPokemons - offset,
        },
        baseURL: process.env.REACT_APP_API_URL,
      })
        .then(({ data }) => {
          // console.log(data);
          setPokemonsList((pokemonsList) => [...pokemonsList, ...data.results]);
          setTotalPokemons(data?.count);
          setTotalOffset(offset);
        })
        .catch((error) => {
          console.log(error);
          Swal.fire(
            "Error!",
            "Someting went wrong, please try again after sometime!",
            "error"
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (offset > totaloffset + 60) {
      setOffset(totaloffset + 60);
    }
  }, [offset, totaloffset, isLoading]);

  useEffect(() => {
    setOffset(0);
  }, []);

  return (
    <div className="pokemon-listing">
      <div className="all-listing">
        <div className="pole"></div>
        <div className="heading">All Pokemons</div>
      </div>
      <div className="row m-0 list-row pb-5">
        {pokemonsList?.length > 0 &&
          pokemonsList?.map((d, i) => {
            return (
              <div className="col-md-2 list-col" key={"pokemon" + i}>
                <Link to={"/pokemons/" + d?.name} className="list-container">
                  <div className="img-container">
                    <img
                      src={
                        process.env.REACT_APP_SPRITES_BASE_URL +
                        "/pokemon/" +
                        getId(d?.url) +
                        ".png"
                      }
                      alt="dumyImage"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "/images/pokemon-placeholder.png";
                      }}
                    />
                  </div>
                  <span>{d?.name}</span>
                </Link>
              </div>
            );
          })}
      </div>
      {isLoading && (
        <div className="d-flex justify-content-center pb-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokemonListing;
