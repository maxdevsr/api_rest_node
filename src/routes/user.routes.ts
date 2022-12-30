import { Router } from "express";
import integration from "../controllers/users/integration.controller";
import userCreateController from "../controllers/users/userCreate.controller";
import userDeleteSelfController from "../controllers/users/userDeleteSelf.controller";
import userListController from "../controllers/users/userList.controller";
import userListOneController from "../controllers/users/userListOne.controller";
import userLoginController from "../controllers/users/userLogin.controller";
import userUpdatePasswordController from "../controllers/users/userUpdatePassword.controller";
import { authUser } from "../middlewares/authUser.middleware";

const routes = Router()

routes.post("/users", userCreateController)
routes.post("/users/login", userLoginController)
routes.get("/users/me", authUser, userListOneController)
routes.get("/users", authUser, userListController)
routes.delete("/users/me", authUser, userDeleteSelfController)
routes.put("/users/me", authUser, userUpdatePasswordController)
routes.get("/integration", integration)


export default routes