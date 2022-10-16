import { createApp } from "./app";

const app = createApp();
const port = 3000;

app.listen(3000, () => {
  console.log(`server is running on Port : ${port}`);
});
