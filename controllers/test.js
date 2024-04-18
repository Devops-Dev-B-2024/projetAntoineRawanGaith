const { addFunction } = require("../services/test");

exports.basicGet = (req, res) => {
  const result = addFunction(req.body.a, req.body.b);
  if (result < 10) {
    res.status(204).send();
  } else {
    res.status(400).send();
  }
};
