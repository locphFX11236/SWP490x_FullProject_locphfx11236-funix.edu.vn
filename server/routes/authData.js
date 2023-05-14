const express = require("express");
const isAuth = require("../config/helper/isAuth");
const { AuthDataController } = require("../controller");
const router = express.Router();

router.post(
    "/login", // Bắt lấy path này
    AuthDataController.PostAuth // Lấy function PostAuth để xử lý router
);

router.post(
    "/logout", // Bắt lấy path này
    isAuth,
    AuthDataController.PostLogOut // Lấy function PostLogOut để xử lý router
);

router.post("/addUser", isAuth, AuthDataController.AddUser);

router.patch("/patchUser/:id", isAuth, AuthDataController.UpdateUser);

router.delete(
    "/deleteUser/:id/:admin_id",
    isAuth,
    AuthDataController.DeleteUser
);

module.exports = router;
