import express from "express";

const app = express();
const PORT: number = parseInt(process.env.PORT, 10) || 8080;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
