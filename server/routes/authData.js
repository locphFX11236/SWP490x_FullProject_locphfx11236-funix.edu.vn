const express = require("express");
const isAuth = require("../config/helper/isAuth");
const { AuthDataController } = require("../controller");
const router = express.Router();

router.post(
    "/login", // Bắt lấy path này
    AuthDataController.PostAuth, // Lấy function PostAuth để xử lý router
    isAuth,
    AuthDataController.GetAuth
);

router.get(
    "/auth/google", // Bắt lấy path này
    AuthDataController.GoogleAsk // Yêu cầu google cung cấp tài nguyên trước khi xác thực
);

router.get(
    "/auth/google/callback", // Bắt lấy path này
    AuthDataController.GoogleCallback // Kết quả xác thực google trả về
);

router.post(
    "/logout", // Bắt lấy path này
    AuthDataController.PostLogOut // Lấy function PostLogOut để xử lý router
);

router.post("/addUser", AuthDataController.AddUser);

router.get("/verify", AuthDataController.Verify);

router.patch("/patchUser/:id", AuthDataController.UpdateUser);

router.delete(
    "/deleteUser/:id/:admin_id",
    isAuth,
    AuthDataController.DeleteUser
);

module.exports = router;
