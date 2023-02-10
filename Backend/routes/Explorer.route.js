const express = require("express");
const { explorerController } = require("../controller");
const router = express.Router();

router.get("/", explorerController.getAllExplorer);
router.get("/:id", explorerController.getExplorerById);
router.post("/", explorerController.setExplorerData);
router.post("/file", explorerController.setFileData);

module.exports = router;