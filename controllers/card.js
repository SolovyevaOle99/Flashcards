import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getCard = (req, res) => {
  const q =
    "SELECT   `id_card`,  `term_name`, `term_definition`, `moduId`  FROM  study_card  WHERE id_card=?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const addCards = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Не зарегистрирован!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const moduleId = req.params.id;
    const q =
      "INSERT INTO study_card (`term_name`, `term_definition`, `moduId`) VALUES (?)";

    const values = [req.body.term_name, req.body.term_definition, moduleId];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("Модуль был создан");
    });
  });
};

export const updateCards = (req, res) => {
  const id_card = req.params.id;
  const q =
    "UPDATE study_card SET `term_name`=?, `term_definition`=?  WHERE  `id_card`=?";

  const values = [req.body.term_name, req.body.term_definition];

  db.query(q, [...values, id_card], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json("Карточка была обновлена");
  });
};

export const deleteCard= (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Не зарегистрирован!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const CardId = req.params.id;
    const q = "DELETE FROM study_card WHERE `id_card`= ?";

    db.query(q, [CardId], (err, data) => {
      if (err) return res.status(403).json("You can delete only your module!");

      return res.json("Module has been deleted!");
    });
  });
};