import React, { useRef, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { IHeader } from "../../utils/models";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useGlobalContext } from "../../contexts/GlobalContext";
import CusModal from "../CusModal";

const Header = ({ onSetShowResult }: IHeader): React.ReactElement => {
  const [txtSearch, setTxtSearch] = useState("");
  const { setState, state } = useGlobalContext();
  const { removeItem } = useLocalStorage();
  const [show, setShow] = useState(false);
  const txtSearchGitUser = useRef<HTMLInputElement>(null);

  const handleShowResult = (page = 1, perPage = 10) => {
    if (txtSearch !== '' && txtSearch !== null) {
      axios({
        method: "get",
        url: "https://api.github.com/search/users",
        params: {
          q: txtSearch,
          page,
          per_page: perPage
        },
      })
        .then(function (response) {
          // console.log("data user github: ", response.data);
          setState((preState) => ({
            ...preState, itemUserGithub: response.data?.items
          }));
          if (txtSearchGitUser.current) {
            txtSearchGitUser.current.value = "";
            // txtSearchGitUser.current.focus();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      onSetShowResult(true);
    } 
    setTxtSearch('');
  };

  const handleGetUserProfile = () => {
    console.log("favoriteGithubUsers: ", state.favoriteGithubUsers);

    setShow(true);
  }

  const handleLogout = () => {
    setState((preState) => ({
      ...preState,
      isAuth: false,
      isShowToast: true,
      contentToast: "Logout success!",
      typeToast: "Success",
    }));
    removeItem("user");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            SKIPLI
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <button className="btn text-white" onClick={handleLogout}>
                Logout
              </button>
            </ul>
            <form onSubmit={e => { e.preventDefault(); }} className="d-flex">
              <input
                className="form-control me-2"
                type="text  "
                placeholder="Search"
                aria-label="Search"
                value={txtSearch}
                ref={txtSearchGitUser}
                onChange={(e) => setTxtSearch(e.target.value)}
              />
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => handleShowResult()}
              >
                Search
              </button>
            </form>
            <button className="btn" type="submit" onClick={handleGetUserProfile}>
              <FontAwesomeIcon icon={faUser} color="#fff" />
            </button>
          </div>
        </div>
      </nav>
      <CusModal title={`User: ${state.user}`} content={state.favoriteGithubUsers} show={show} setShow={setShow} />
    </header>
  );
};

export default Header;
