import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getAllModules = (req, res) => {
  const q = "SELECT  `user_name`, `id_module`,`name_module`, COUNT(id_card) as count FROM user_inform u JOIN study_module m ON u.id = m.usId LEFT JOIN study_card c ON m.id_module = c.moduId GROUP BY m.id_module"
  
    
  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getModule = (req, res) => {
  const q =
    "SELECT  `user_name`, `id_card`, `id_module`, `name_module`, `term_name`, `term_definition`, `description` FROM user_inform u JOIN study_module m ON u.id = m.usId LEFT JOIN study_card c ON m.id_module = c.moduId WHERE m.id_module=?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};



export const addModule = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Не зарегистрирован!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO study_module (`name_module`, `description`, `usId`) VALUES (?)";

    const values = [req.body.name_module, req.body.description, userInfo.id];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("Модуль был создан");
    });
  });
};



export const deleteModule = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Не зарегистрирован!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const moduleId = req.params.id;
    const q = "DELETE FROM study_module WHERE `id_module`= ? AND `usId` = ?";

    db.query(q, [moduleId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your module!");

      return res.json("Module has been deleted!");
    });
  });
};

export const updateModule = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Не зарегистрирован!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const moduleId = req.params.id;
    const q =
      "UPDATE study_module SET `name_module`=?, `description`=? WHERE `id_module`= ? AND `usId` = ?";

    const values = [req.body.name_module, req.body.description];

    db.query(q, [...values, moduleId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("Модуль был обновлен");
    });
  });
};

