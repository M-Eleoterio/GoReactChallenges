const express = require("express");
const { uuid } = require("uuidv4");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.json(repositories);
});
app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return res.json(repository)
});

app.put("/repositories/:id", (req, res) => {
    const { title, url, techs, likes } = req.body
    const { id } = req.params

    const repoIndex = repositories.findIndex(repository => repository.id === id)

    if (repoIndex < 0 ) {
        return res.status(404).json({ error: "Repository not found"})
    }

    const repository = {
        id,
        title,
        url,
        techs,
        likes: repositories[repoIndex].likes
    }

    repositories[repoIndex] = repository 

    return res.json(repository)

});
app.delete("/repositories/:id", (req, res) => {
    const { id } = req.params

    const repoIndex = repositories.findIndex(repository => repository.id === id)

    if (repoIndex < 0 ) {
        return res.status(404).json({ error: "Repository not found"})
    }

    repositories.splice(repoIndex, 1)

    return res.status(204).send()
});

app.put("/repositories/:id/like", (req, res) => {
    const { id } = req.params

    const repoIndex = repositories.findIndex(repository => repository.id === id)

    if (repoIndex < 0 ) {
        return res.status(404).json({ error: "Repository not found"})
    }

    const repository = {
        ...repositories[repoIndex],
        likes: repositories[repoIndex].likes + 1
    }

    repositories[repoIndex] = repository

    return res.json(repository)

});

app.listen(3333);
console.log(`🚀Back-end Started (●'◡'●)`);
