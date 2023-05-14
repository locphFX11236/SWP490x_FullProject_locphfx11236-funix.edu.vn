const express = require("express");

const isAuth = require("../config/helper/isAuth");
const { ShowDataController } = require("../controller");

const router = express.Router();

router.get("/", ShowDataController.GetIndex);

router.post("/addProgram", isAuth, ShowDataController.AddProgram);

router.patch("/patchProgram/:id", isAuth, ShowDataController.UpdateProgram);

router.delete(
    "/deleteProgram/:id/:admin_id",
    isAuth,
    ShowDataController.DeleteProgram
);

module.exports = router;
