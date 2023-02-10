const express = require("express");
const router = express.Router();
const explorer = require('./Explorer.route');
const fileUpload = require("../controller/FileUpload.controller");

router.use('/explorer', explorer);
router.use('/set/explorer', explorer);
router.use("/fileUpload", fileUpload);

module.exports = router;