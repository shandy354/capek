const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
var path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 },
  })
);

app.use(
  cors({
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
  })
);

app.use(flash());
app.use(methodOverride("_method"));
app.use(express.static("public"));

// app.use(express.urlencoded({extended: false}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use("/", require("./routes/index"));
// route
const router = require("./routes/index");
app.use(router);
// Catch 404 and forward to error handler
// app.use((req, res, next) => {
//   const error = new Error('Not Found');
//   error.status = 404;
//   next(error);
// });
// Error handler
// app.use((error, req, res, next) => {
//   console.log(error);
//   res.status(error.status || 500);

//   req.headers.accept.includes("application/json")
//       ? res.json({ error: error.message, status: error.status })
//       : res.render("error", { error });
// });

app.listen(3000, () => {
  console.log(`Server has been started on 'http://localhost:3000'`);
});
