const PORT = 8000;
const express = require("express");
const routes = require("./routes/api");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(require("body-parser").json());
app.use("/", routes);

app.listen(PORT, () => console.log("Server running on PORT " + PORT));
