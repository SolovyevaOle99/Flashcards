import express from "express";
import {
  getAllModules,
  addModule,
  deleteModule,
  updateModule,
  getModule,

} from "../controllers/module.js";

const router = express.Router();

router.get("/", getAllModules);
router.get("/:id", getModule);
router.post("/", addModule);
router.delete("/:id", deleteModule);
router.put("/:id", updateModule);

export default router;
