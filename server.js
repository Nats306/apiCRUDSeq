require ("dotenv").config();
//nuestra dependencia para correr el api
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const usuarioRoutes = require("./routes/usuarioRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
//Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);


const PORT = process.env.PORT || 3000;  //puerto donde se va a correr el api
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});