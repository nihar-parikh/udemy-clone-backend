import express from "express";
import {
  addToPlayLists,
  deleteMyProfile,
  deleteUser,
  forgotPassword,
  getAllUsers,
  getMyProfile,
  getTotalSubscriptions,
  getTotalUsers,
  loginUser,
  logoutUser,
  registerUser,
  removeFromPlayLists,
  resetPassword,
  updatePassword,
  updateUser,
  updateUserRole,
} from "../controllers/user.js";
import { authorisedRoles, isAuthenticatedUser } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", singleUpload, registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:resetToken", resetPassword);
router.get("/me", isAuthenticatedUser, getMyProfile);
router.put("/password/update", isAuthenticatedUser, updatePassword);
router.put("/me/update", isAuthenticatedUser, singleUpload, updateUser);
router.get(
  "/admin/allUsers",
  isAuthenticatedUser,
  authorisedRoles(["admin"]),
  getAllUsers
);
router.get(
  "/admin/totalUsers",
  isAuthenticatedUser,
  authorisedRoles(["admin"]),
  getTotalUsers
);
router.get(
  "/admin/totalSubscriptions",
  isAuthenticatedUser,
  authorisedRoles(["admin"]),
  getTotalSubscriptions
);
router.delete("/me/delete", isAuthenticatedUser, deleteMyProfile);
// router.get(
//   "/admin/user/:userId",
//   isAuthenticatedUser,
//   authorisedRoles(["admin"]),
//   getASingleUser
// );
router.put(
  "/admin/user/:userId",
  isAuthenticatedUser,
  authorisedRoles(["admin"]),
  updateUserRole
);
router.delete(
  "/admin/user/:userId",
  isAuthenticatedUser,
  authorisedRoles(["admin"]),
  deleteUser
);
router.put("/addToPlayLists", isAuthenticatedUser, addToPlayLists);
router.delete("/removeFromPlayLists", isAuthenticatedUser, removeFromPlayLists);

export default router;
