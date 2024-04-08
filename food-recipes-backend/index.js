const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const mysql = require("mysql2/promise");
const port = 8000;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require("bcrypt");

const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your_password",
    database: "food_recipes",
    port: 3306,
  });
};
app.use(bodyparser.json());
app.get("/menu", async (req, res) => {
  const results = await conn.query("SELECT * FROM recipes");

  res.json(results[0]);
});
app.get("/menu/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const results = await conn.query("SELECT * FROM recipes WHERE id = ?", id);
    if (results[0].length > 0) {
      res.json(results[0][0]);
    } else {
      throw new Error("i dont know");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "something wrong",
      erroeMessage: error.message,
    });
  }
});
app.get("/menu/:username", async (req, res) => {
  try {
    let username = req.params.username;
    const results = await conn.query(
      "SELECT * FROM recipes WHERE writer = ?",
      username
    );
    if (results[0].length > 0) {
      res.json(results[0][0]);
    } else {
      throw new Error("i dont know");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "something wrong",
      erroeMessage: error.message,
    });
  }
});
app.post("/menu", async (req, res) => {
  try {
    let user = req.body;

    const results = await conn.query("INSERT INTO recipes SET ?", user);
    res.json({
      message: "insert complete",
      data: results[0],
    });
  } catch (error) {
    const erroeMessage = error.message || "something wrong";
    const errors = error.errors;
    console.log(error.message);
    res.status(500).json({
      message: erroeMessage,
      errors: errors,
    });
  }
});

app.listen(port, async (req, res) => {
  await initMySQL();
  console.log("run at : " + port);
});
