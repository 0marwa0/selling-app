import React, { useEffect } from "react";
import Post from "../shered/post";
import NavBar from "../shered/NavBar";
import Modal from "react-modal";
import axios from "axios";
import { VscSearch } from "react-icons/vsc";
import Loading from "react-loading-components";
function Home() {
  const [item, setItem] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSearching, setSearch] = React.useState(false);
  const [users, storeUser] = React.useState(["dddkdk"]);
  const [isEmpty, setEmpty] = React.useState(false);
  const [key, setKey] = React.useState("");
  const getKey = (event) => {
    setKey(event.target.value);
  };
  const getUser = () => {
    axios.get("http://localhost:9000/getUsers").then((data) => {
      storeUser(data.data);
      setIsLoading(false);
    });
  };
  const getPosts = () => {
    setIsLoading(true);
    // e.preventDefault();
    setSearch(true);
    if (key === "") {
      return setEmpty(true);
    } else {
      return axios.get(`http://localhost:9000/getPosts/${key}`).then((data) => {
        setItem(data.data);

        if (data.data.length === 0) {
          setEmpty(true);
          setIsLoading(false);
        } else {
          setEmpty(false);
        }
        setIsLoading(false);
      });
    }
  };

  useEffect(() => {
    getUser();
    //getPosts();
  }, []);
  return (
    <div>
      <NavBar />
      <div className="contener">
        <div className="main_wrapper">
          <div class="searchBox">
            <input
              className="searchInput"
              type="text"
              name=""
              onChange={(e) => getKey(e)}
              placeholder="Enter loaction"
            />
            <button className="searchButton" onClick={(e) => getPosts(e)}>
              <i>
                <VscSearch color="black" />
              </i>
            </button>
          </div>
          {isSearching ? null : (
            <img
              src={require("../shered/undraw_web_shopping_dd4l.png")}
              width="400px"
            />
          )}
          {isLoading ? (
            <div>
              <div className="post_wrapper_loading">
                <div class="loading">
                  <div class="loadingWrapper">
                    <span>
                      <div className="load_card">
                        <div id="loading"> </div>
                      </div>

                      <div className="load_card">
                        <div id="loading"> </div>
                      </div>
                      <div className="load_card">
                        <div id="loading"> </div>
                      </div>
                    </span>
                    <h1> . . . . . .</h1>
                  </div>
                </div>
              </div>
              <div className="post_wrapper_loading">
                <div class="loading">
                  <div class="loadingWrapper">
                    <span>
                      <div className="load_card">
                        <div id="loading"> </div>
                      </div>

                      <div className="load_card">
                        <div id="loading"> </div>
                      </div>
                      <div className="load_card">
                        <div id="loading"> </div>
                      </div>
                    </span>
                    <h1> . . . . . .</h1>
                  </div>
                </div>
              </div>
            </div>
          ) : isEmpty ? (
            <div>
              <img
                width="300px"
                src={require("../shered/undraw_file_searching_duff.png")}
              />
              <p style={{ textAlign: "center" }}>No Data Found</p>
            </div>
          ) : (
            <Post item={item} users={users} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
