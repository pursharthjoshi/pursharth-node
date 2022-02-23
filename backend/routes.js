const router = require("express").Router();
const { jwtAuth } = require("./auth");
const user = require("./controllers/user");

router.post("/sign-in", user.loginValidate(), user.login);
router.post("/sign-up", user.singUpValidate("register"), user.signup);

module.exports = (app) => {
  app.use("/api", router);

  app.get("*", (req, res) => {
    res.status(404).json({ message: "not found" });
  });

  app.use((err, req, res, next) => {
    if (err.type === "entity.parse.failed") {
      return res.status(400).json({ message: "bad request" });
    }
    next(err);
  });
};
