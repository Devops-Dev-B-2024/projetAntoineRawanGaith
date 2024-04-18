const router = require("express").Router();
const blaController = require("../controllers/bla");

router.get("/", blaController.basicGet);

module.exports = router;
