import express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

interface Post {
  id: string;
  title: string;
}

const posts: Post[] = [];

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  if (title.length < 1) {
    return res.status(400).send("post title is required");
  }
  let post = { id, title };
  posts.push(post);
});
