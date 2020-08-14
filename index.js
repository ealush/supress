const supress = require("./supress");
const app = supress();

app.listen("8080");

app.get(
  "/welcome",
  (req, res, next) => {
    console.log("I am in the middleware1");
    next();
  },
  (req, res, next) => {
    console.log("I am in the middleware2");
    setTimeout(() => {
      next();
    }, 500);
  },
  (req, res) => {
    console.log("I am in the get handler");

    res.end("yofi, yofi");
  }
);

app.post(
  "/welcome",
  (req, res, next) => {
    console.log("I am in the middleware1");
    next();
  },
  (req, res, next) => {
    console.log("I am in the middleware2");
    setTimeout(() => {
      next();
    }, 500);
  },
  (req, res) => {
    console.log("I am in the post handler");

    res.end("yofi, yofi");
  }
);
