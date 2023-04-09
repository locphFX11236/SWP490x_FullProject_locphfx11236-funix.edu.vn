const express = require("express");

const { ShowDataController } = require("../controller");

const router = express.Router();

router.get("/", ShowDataController.GetIndex);

router.post("/addProgram", ShowDataController.AddProgram);

router.patch("/patchProgram/:id", ShowDataController.UpdateProgram);

router.delete("/deleteProgram/:id/:admin_id", ShowDataController.DeleteProgram);

module.exports = router;
