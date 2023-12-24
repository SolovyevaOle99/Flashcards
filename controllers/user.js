import { db } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const updateUser = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Не зарегистрирован!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const q =
        "UPDATE user_inform SET `name`=?, `surname`=?, `email`=?, `user_name`=?, `password`=? WHERE  `id` = ?";
  
      const values = [req.body.name, req.body.surname, req.body.email, req.body.user_name, hash];
  
      db.query(q, [...values, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
  
        return res.status(200).json("Данные о пользователе обновлены");
      });
    });
  };
  