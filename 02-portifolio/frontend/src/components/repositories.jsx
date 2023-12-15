import React, { useEffect, useState } from "react";
import api from "../services/Api";
import "./repositories.css";

//ICONS
import { GrLike } from "react-icons/gr";
import { GrDislike } from "react-icons/gr";
import { MdOutlineDelete } from "react-icons/md";
//

function Repository() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((res) => {
      setRepos(res.data);
    });
  }, [repos]);

  function handleSubmitEvent(event) {
    event.preventDefault();

    let title = document.getElementById("repoTitle").value.trim();
    let url = document.getElementById("repoURL").value.trim();

    if (url === "" || title === "") {
      return alert("Por favor, preencha todos os campos.");
    }

    let newRepo = {
      title: title,
      url: url,
    };

    api.post("/repositories", newRepo).then((res) => {
      let newArray = [...repos, res.data];
      setRepos(newArray);
    });
  }

  function handleDeleteEvent(repoId, event) {
    api.delete(`repositories/${repoId}`).then((res) => {
      const index = repos.findIndex((repo) => repo.id === repoId);
      let newArray = [...repos];
      newArray.splice(index, 1);
      setRepos(newArray);
    });
  }

  function handleLikeEvent(repoId, event) {
    event.preventDefault();
    api.put(`/repositories/${repoId}/like`).then((res) => {
      const index = repos.findIndex((repo) => repo.id === repoId);
      let newArray = [...repos];
      newArray[index] = res.data;
      setRepos(newArray);
    });
  }

  function handleDeslikeEvent(repoId, event) {
    event.preventDefault();
    api.put(`/repositories/${repoId}/deslike`).then((res) => {
      const index = repos.findIndex((repo) => repo.id === repoId);
      let newArray = [...repos];
      newArray[index] = res.data;
      setRepos(newArray);
    });
  }

  return (
    <div className="Repository">
      <div className="repos">
        {repos.map((repo, index) => {
          localStorage.setItem(`likeState${index}`, "like");
          const likeState = localStorage.getItem(`likeState${index}`);
          return (
            <div className="repo" key={repo.id}>
              <ul>
                <a target="_blank" rel="noreferrer" href={repo.url}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                    alt=""
                  />
                </a>
                <li>Titulo: {repo.title}</li>
                <li>
                  URL:{" "}
                  <a target="_blank" rel="noreferrer" href={repo.url}>
                    {repo.url}
                  </a>
                </li>
                <div className="btns">
                  <button
                    id={"likeBtn" + index}
                    className="likeBtn Btn"
                    onClick={(event) => {
                      handleLikeEvent(repo.id, event);
                    }}
                  >
                    <GrLike className="btnIcon" /> {repo.likes}
                  </button>
                  <button
                    id={"deslikeBtn" + index}
                    className="deslikeBtn Btn"
                    onClick={(event) => {
                      handleDeslikeEvent(repo.id, event);
                    }}
                  >
                    <GrDislike className="btnIcon" />
                  </button>
                  <button
                    onClick={(event) => handleDeleteEvent(repo.id, event)}
                    className="deleteBtn Btn"
                  >
                    <MdOutlineDelete className="btnIcon" />
                  </button>
                </div>
              </ul>
            </div>
          );
        })}
      </div>

      <hr />

      <div className="form">
        <h2>Adicionar repositório</h2>
        <label style={{marginTop: '20px'}} htmlFor="repoTitle">Titulo: </label>
        <input type="text" name="" className="repoInput" id="repoTitle" />
        <br />
        <br />
        <label style={{marginTop: '20px'}} htmlFor="repoURL">URL:</label>
        <input type="text" name="" className="repoInput" id="repoURL"  />
        <br />
        <button className="Btn" style={{marginTop: '20px'}} onClick={handleSubmitEvent}>Criar</button>
      </div>
    </div>
  );
}

export default Repository;
