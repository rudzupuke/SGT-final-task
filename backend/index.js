const express = require("express");
const routes = require("./src/routes/routes");

const app = express();
const cors = require("cors");

app.use(cors());

app.use(require("body-parser").json());

app.use("/", routes);

const PORT = 8000;
app.listen(PORT, () =>
    console.log(" 🐶 Server running on " + `http://localhost:${PORT}`)
);
