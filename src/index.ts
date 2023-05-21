import app from "./server";

import dotenv from "dotenv";
dotenv.config();

app.listen(4000, () => {
  console.log("server listening on port 4000");
});
