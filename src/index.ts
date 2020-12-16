import express from "express";

const PORT: number = Number(process.env.PORT) || 80;

const app = express();

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
