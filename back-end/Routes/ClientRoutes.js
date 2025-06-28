import {
  GetData,
  InsertData,
  SIGN_UP,
  Login,
} from "../Controller/ClientController.js";
import { Router } from "express";

const router = Router();
router.get("/transactions", GetData);
router.post("/transactions", InsertData);
router.get("/GetData", GetData);
router.post("/InsertData", InsertData);
router.post("/signup", SIGN_UP);
router.post("/log-in", Login);

export default router;
