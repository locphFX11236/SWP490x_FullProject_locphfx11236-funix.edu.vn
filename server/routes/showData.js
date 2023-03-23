const express = require("express");

const { ShowDataController } = require("../controller");

const router = express.Router();

router.get("/", ShowDataController.GetIndex);

router.post("/addProgram", ShowDataController.AddCollection);

router.patch("/patchProgram/:id", ShowDataController.UpdateCollection);

router.delete(
    "/deleteProgram/:id/:admin_id",
    ShowDataController.DeleteCollection
);

module.exports = router;
