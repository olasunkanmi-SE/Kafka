import express from "express";

const PORT: number = Number(process.env.PORT) || 3000;

const app = express();

app.get("/", (req, res) => {
  let payload: {} = { id: "64644", name: "New Order Available" };
  let convert: any = JSON.stringify(payload);
  console.log(convert);
  res.send({});
});

app.listen(PORT, "0.0.0.0");

console.log(`server listening on port ${PORT}`);
