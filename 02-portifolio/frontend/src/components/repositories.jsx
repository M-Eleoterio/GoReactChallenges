import React, { useEffect, useState } from "react";
import api from "../services/Api";

function Repository() {
 const [repos, setRepos] = useState([]);

 useEffect(() => {
    api.get("/repositories").then((res) => {
      setRepos(res.data);
    });
 }, [repos]);

 return (
    <div className="Repository">
      {repos.map((repo) => {
        return (
          <ul key={repo.id}>
            <li>Titulo: {repo.title}</li>
            <li>URL: {repo.url}</li>
            <li>Likes: {repo.likes}</li>
          </ul>
        );
      })}
    </div>
 );
}

export default Repository;