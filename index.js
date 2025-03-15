const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const { router } = require("./routers/router");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { user } = require("./routers/user");
const { loginManager, loginTeacher, loginStudent } = require("./middleware");
const { manager } = require("./routers/manager");
const { teacher } = require("./routers/teacher");
const { student } = require("./routers/student");




app.use(express.static("public"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(cors());
app.use(
  session({
    secret: "topSecret",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
require("./middleware/passport")(passport);

app.use("/", router);
app.use("/user", passport.authenticate("jwt", { session: false }), user);
app.use(
  "/manager",
  passport.authenticate("jwt", { session: false }),
  loginManager,
  manager
);
app.use(
  "/teacher",
  passport.authenticate("jwt", { session: false }),
  loginTeacher,
  teacher
);
app.use(
  "/student",
  passport.authenticate("jwt", { session: false }),
  loginStudent,
  student
);

app.listen(8080);

