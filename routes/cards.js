import express from "express";
import {
  addCards,
  updateCards, 
  getCard,
  deleteCard
} from "../controllers/card.js";

const router = express.Router();


router.post("/:id", addCards);
router.get("/:id", getCard);
router.put("/:id", updateCards);
router.delete("/:id", deleteCard);

export default router;
