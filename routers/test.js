const router = require("express").Router();
const testController = require("../controllers/test");

router.get("/", testController.basicGet);

module.exports = router;
