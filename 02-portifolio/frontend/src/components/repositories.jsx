import React, { useEffect, useState } from "react";
import api from "../services/Api";

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
      {repos.map((repo, index) => {
        localStorage.setItem(`likeState${index}`, "like")
        const likeState = localStorage.getItem(`likeState${index}`);

        return (
          <ul key={repo.id}>
            <li>Titulo: {repo.title}</li>
            <li>
              URL:{" "}
              <a target="_blank" rel="noreferrer" href={repo.url}>
                {repo.url}
              </a>
            </li>
            <li>Likes: {repo.likes}</li>
            <button
              id={"likeBtn" + index}
              onClick={(event) => {
                handleLikeEvent(repo.id, event);

              }}
            >
              Like
            </button>
            <button
              id={"deslikeBtn" + index}
              onClick={(event) => {
                handleDeslikeEvent(repo.id, event);

              }}
            >
              Deslike
            </button>

            <button onClick={(event) => handleDeleteEvent(repo.id, event)}>
              Deletar
            </button>
          </ul>
        );
      })}

      <hr />

      <h2>Adicionar repositório</h2>
      <label htmlFor="repoTitle">Titulo:</label>
      <input type="text" name="" id="repoTitle" />
      <br />
      <br />
      <label htmlFor="repoURL">URL:</label>
      <input type="text" name="" id="repoURL" />
      <br />
      <button onClick={handleSubmitEvent}>Criar</button>
    </div>
  );
}

export default Repository;
