import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./PokemonDetails.css";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../Store/reducer/commonSlice";

function PokemonDetails() {
  const [data, setData] = useState({});
  const [bookmarks, setBookmarks] = useState({});
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let tempItems = JSON.parse(localStorage.getItem("pokemons"));
    setBookmarks(tempItems ? tempItems : {});
  }, []);

  const addBookmark = useCallback(
    (name, id) => {
      let tempBookmarks = JSON.parse(JSON.stringify(bookmarks));
      console.log(tempBookmarks);
      if (tempBookmarks?.hasOwnProperty(id)) {
        delete tempBookmarks[id];
        console.log(tempBookmarks);
        localStorage.setItem("pokemons", JSON.stringify(tempBookmarks));
        toast("Pokemon removed from favorites", { type: "success" });
        setBookmarks(tempBookmarks);
        return;
      }

      tempBookmarks[id] = name;
      console.log(tempBookmarks);
      console.log(tempBookmarks);
      localStorage.setItem("pokemons", JSON.stringify(tempBookmarks));
      setBookmarks(tempBookmarks);

      toast("Pokemon added to favorite", { type: "success" });
    },
    [bookmarks]
  );

  useEffect(() => {
    if (name) {
      dispatch(setLoading(true));
      axios("pokemon/" + name, {
        method: "GET",
        baseURL: process.env.REACT_APP_API_URL,
      })
        .then((response) => {
          console.log(response);
          setData(response.data);
        })
        .catch((error) => {
          if (error?.response?.status === 404) {
            Swal.fire(
              "Not Found!",
              "Pokemon details are not available!",
              "warning"
            ).then((choice) => {
              navigate("/pokemons");
            });
            return;
          }
          Swal.fire(
            "Error!",
            "Someting went wrong, please try again after sometime!",
            "error"
          );
          console.log(error);
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  }, [name]);
  return (
    <div className="pokemon-details pb-5">
      {Object.keys(data)?.length > 0 && (
        <>
          <div className="row m-0 list-row">
            <div className="col-md-4 image-container">
              <img
                src={data?.sprites?.other?.dream_world?.front_default}
                alt="pokemonImage"
                width={200}
                height={200}
              />
            </div>
            <div className="col-md-7 details-container">
              <h2>{name}</h2>
              <p className="mb-1 species">
                Species: <span>{data?.species?.name}</span>
              </p>
              <p className="mb-1 abilities">
                Abilities:
                {data?.abilities?.map((d, i) => {
                  return <span>{d?.ability?.name}</span>;
                })}
              </p>
              <p className="types">
                Type:
                {data?.types?.map((d, i) => {
                  return <span>{d?.type?.name}</span>;
                })}
              </p>
              <div className="stats-wrapper">
                <div className="stats-box">
                  Height <span> {data?.height}</span>
                </div>
                <div className="stats-box">
                  Weight <span>{data?.weight}</span>
                </div>
                <div className="stats-box">
                  Base Experience <span>{data?.base_experience}</span>
                </div>
              </div>
            </div>
            <div className="col-md-1 fs-3">
              <i
                className={
                  bookmarks.hasOwnProperty(data?.id)
                    ? "fa-solid fa-bookmark"
                    : "fa-regular fa-bookmark"
                }
                onClick={() => {
                  addBookmark(data?.name, data?.id);
                }}
              ></i>
            </div>
          </div>
          <div className="base-stats">
            <div className="all-listing">
              <div className="pole"></div>
              <div className="heading">Stats</div>
            </div>
            <div className="row m-0 stats-listing">
              {data?.stats?.map((d, i) => {
                return (
                  <div className="col">
                    <div className="row m-0 stats-wrapper h-100">
                      <div className="col-md-8 ps-0 title">
                        <p>Base Stat </p>
                        <span>{d?.stat?.name}</span>
                        <progress
                          id="file"
                          value={d?.base_stat}
                          max="100"
                        ></progress>
                      </div>
                      <div className="col-md-4 up-arrow ">
                        <span>
                          {/* <i className="fa-solid fa-arrow-up"></i> */}
                          {d?.base_stat}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="details-heading">
            <div className="all-listing">
              <div className="pole"></div>
              <div className="heading">Other Details</div>
            </div>
          </div>
          <div className="all-details pb-5">
            {data?.held_items?.length > 0 && (
              <div className="held-items">
                Held Items :
                {data?.held_items?.map((d, i) => {
                  return (
                    <div>
                      <span>{d?.item?.name}</span>
                      <img
                        src={
                          process.env.REACT_APP_SPRITES_BASE_URL +
                          "/items/" +
                          d?.item?.name +
                          ".png"
                        }
                        alt=""
                      />
                    </div>
                  );
                })}
              </div>
            )}

            <div className="moves mt-3">
              Moves&nbsp;:
              <div className="moves-box">
                {data?.moves?.map((d, i) => {
                  return <span>{d?.move?.name}</span>;
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PokemonDetails;
