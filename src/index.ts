import express from "express";
import router from "./server";

const app = express();
const PORT = 8080;

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;