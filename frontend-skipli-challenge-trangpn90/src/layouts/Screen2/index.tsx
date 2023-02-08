import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import { useGlobalContext } from "../../contexts/GlobalContext";
import axios from "axios";
import useLocalStorage from "../../hooks/useLocalStorage";

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
          <div className="table-responsive mt-4">
            <table className="table text-center">
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>id</th>
                  <th style={{ width: "5%" }}>login</th>
                  <th style={{ width: "8%" }}>avatar_url</th>
                  <th style={{ width: "8%" }}>html_url</th>
                  <th style={{ width: "8%" }}>public_repos</th>
                  <th style={{ width: "8%" }}>followers</th>
                  <th style={{ width: "8%" }}>actions</th>
                </tr>
              </thead>
              <tbody>
                {state.itemUserGithub?.map((item) => (
                  <tr key={item["id"]}>
                    <th scope="row" className="text-start">
                      {item["id"]}
                    </th>
                    <td>{item["login"]}</td>
                    <td>
                      <img
                        src={item["avatar_url"]}
                        className="img-thumbnail"
                        alt={item["login"]}
                        width={50}
                      />
                    </td>
                    <td>{item["html_url"]}</td>
                    <td>
                      <a href={item["repos_url"]} target="blank">
                        Public repos
                      </a>
                    </td>
                    <td>
                      <a href={item["following_url"]} target="blank">
                        Followers
                      </a>
                    </td>
                    <td>
                      <button
                        className="btn"
                        type="submit"
                        onClick={() => handleLikeProfile(item["id"])}
                      >
                        <FontAwesomeIcon icon={faHeart} color="green" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      )}
    </div>
  );
};

export default Screen2;
