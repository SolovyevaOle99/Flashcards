import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //CHECK EXISTING USER
  const q =
    "SELECT * FROM user_inform WHERE email = ? AND (user_name = ? OR name = ? OR surname = ?)";

  db.query(
    q,
    [req.body.email, req.body.user_name, req.body.name, req.body.surname],
    (err, data) => {
      if (err) return res.json(err);
      if (data.length) return res.status(409).json("Пользователь уже существует");
     

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const q =
        "INSERT INTO user_inform(`user_name`, `email`, `name`, `surname`, `password`)  VALUES (?)";

      const values = [
        req.body.user_name,
        req.body.email,
        req.body.name,
        req.body.surname,
        hash,
      ];

      db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json("Пользватель был создан");
      });
    }
  );
};

export const login = (req, res) => {
  const q = "SELECT * FROM user_inform WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0)
      return res.status(404).json("Пользователь не найден!");

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect) return res.status(400).json("Неверные данные!");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("Пользователь вышел");
};
