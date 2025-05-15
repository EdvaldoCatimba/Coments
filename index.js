const express = require("express");
const exbhbs = require("express-handlebars");
const session = require("express-session");
const app = express();
const port = 3000;
const flash = require("express-flash");
const conn = require("./db/conn");
const comments = require("./routers/comments");
const UserRouters = require("./routers/UserRouters");


//configurações do preojecto
app.engine("handlebars", exbhbs.engine());
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(
  session({
    secret: "senha",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

//Rotas
app.use("/comments", comments);
app.use("/users", UserRouters);

//Models
const User = require("./models/User");
const Address = require("./models/Address");
const Comments = require("./models/Comments");




app.get("/", (req, res) => {
  res.render("home");
});
app.get('/about', (req, res) => {
  res.render('about');
});

conn
  .sync()
  .then(() => {
    console.log("Banco de dados conectado com sucesso");
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Erro ao conectar ao banco de dados: " + err);
  });
