import axios from "axios";
import "./Search.css";
import "./PokemonDetails.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../Store/reducer/commonSlice";
import Swal from "sweetalert2";

function Search() {
  const [searchData, setSearchData] = useState({});
  const dispatch = useDispatch();

  let searchtxt = "";
  const searchHandler = (e) => {
    console.log(e);
    if (e.keyCode === 13) {
      searchtxt = e.target.value.trim();
      dispatch(setLoading(true));
      axios(process.env.REACT_APP_API_URL + "/pokemon/" + searchtxt, {
        method: "GET",
      })
        .then((response) => {
          console.log(response.data);
          setSearchData(response.data);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setSearchData({});
          }
          console.log(error);
          Swal.fire("Not Found!", searchtxt + " Pokemon not found!", "warning");
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  };
  return (
    <div className="dashboard ">
      <div
        className={
          "header" + (Object.keys(searchData)?.length === 0 ? " active" : "")
        }
      >
        <div className="search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search Dashboard"
            onKeyDown={searchHandler}
          />
        </div>
      </div>
      {Object.keys(searchData)?.length > 0 && (
        <div className="pokemon-details pb-5">
          <div className="row m-0 list-row">
            <div className="col-md-4 image-container">
              <img
                src={searchData?.sprites?.other?.dream_world?.front_default}
                alt="pokemonImage"
                width={200}
                height={200}
              />
            </div>
            <div className="col-md-7 details-container">
              <h2>{searchtxt}</h2>
              <p className="mb-1 species">
                Species: <span>{searchData?.species?.name}</span>
              </p>
              <p className="mb-1 abilities">
                Abilities:
                {searchData?.abilities?.map((d, i) => {
                  return <span>{d?.ability?.name}</span>;
                })}
              </p>
              <p className="types">
                Type:
                {searchData?.types?.map((d, i) => {
                  return <span>{d?.type?.name}</span>;
                })}
              </p>
              <div className="stats-wrapper">
                <div className="stats-box">
                  Height <span> {searchData?.height}</span>
                </div>
                <div className="stats-box">
                  Weight <span>{searchData?.weight}</span>
                </div>
                <div className="stats-box">
                  Base Experience <span>{searchData?.base_experience}</span>
                </div>
              </div>
            </div>
            <div className="col-md-1 fs-3">
              {/* <i
                      className={
                        bookmarks.hasOwnProperty(searchData?.id)
                          ? "fa-solid fa-bookmark"
                          : "fa-regular fa-bookmark"
                      }
                      onClick={() => {
                        addBookmark(searchData?.name, searchData?.id);
                      }}
                    ></i> */}
            </div>
          </div>
          <div className="base-stats">
            <div className="all-listing">
              <div className="pole"></div>
              <div className="heading">Stats</div>
            </div>
            <div className="row m-0 stats-listing">
              {searchData?.stats?.map((d, i) => {
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
            {searchData?.held_items?.length > 0 && (
              <div className="held-items">
                Held Items :
                {searchData?.held_items?.map((d, i) => {
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
                {searchData?.moves?.map((d, i) => {
                  return <span>{d?.move?.name}</span>;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
