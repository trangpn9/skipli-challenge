import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import { useGlobalContext } from "../../contexts/GlobalContext";
import axios from "axios";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Pagination } from "react-bootstrap";

const Screen2 = (): React.ReactElement => {
  const [showResult, setShowResult] = useState(false);
  const { state, setState } = useGlobalContext();
  const { getItem } = useLocalStorage();

  const handleLikeProfile = (idProfile: string) => {
    axios({
      method: "put",
      url: "http://localhost:3600/api/user/like-github",
      data: {
        phoneNumber: getItem("user"), githubUserId: idProfile
      },
    })
      .then(function (response) {
        const { code, message } = response.data;
        if (code === '2200') {
          setState(preState => ({ ...preState, isShowToast: true, contentToast: message, typeToast: "Success" }));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div id="screen2">
      <Header onSetShowResult={setShowResult} />
      {showResult && (
        <main className="container">
          <div className="row row-cols-2 row-cols-md-5 g-4 my-4">
            {state.itemUserGithub?.map((item) => (
              <div className="col" key={item["id"]}>
                <div className="card h-100">
                  <img src={item["avatar_url"]} className="card-img-top" alt={item["login"]} />
                  <div className="card-body">
                    <h5 className="card-title">{item["login"]}</h5>
                    <a href={item["html_url"]} target="_blank">Link</a>
                  </div>
                  <div className="card-footer">
                    <button
                      className="btn"
                      type="submit"
                      onClick={() => handleLikeProfile(item["id"])}
                    >
                      <FontAwesomeIcon icon={faHeart} color="green" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center">
            <Pagination>
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Ellipsis />

              <Pagination.Item>{10}</Pagination.Item>
              <Pagination.Item>{11}</Pagination.Item>
              <Pagination.Item active>{12}</Pagination.Item>
              <Pagination.Item>{13}</Pagination.Item>
              <Pagination.Item disabled>{14}</Pagination.Item>

              <Pagination.Ellipsis />
              <Pagination.Item>{20}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </div>
        </main>
      )}
    </div>
  );
};

export default Screen2;
