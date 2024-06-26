const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mysql = require("mysql2/promise");
const createConnectionErr = new Error("Failed to create MySQL connection");

const app = express();
const port = 8000;

const initMySQL = async () => {
  try {
    conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "food_recipes",
      port: 3306,
    });
    console.log("MySQL connection established");
  } catch (error) {
    console.error("MySQL connection error:", error);
    throw createConnectionErr; // Throw the predefined error
  }
};

// Middleware
app.use(bodyParser.json());
app.use(
  session({ secret: "your_secret", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport local strategy for authentication
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Query your database to find the user
      const [rows] = await conn.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );
      const user = rows[0];

      // If user not found or password doesn't match, return false
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: "Incorrect username or password" });
      }

      // If user found and password matches, return the user object
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // Fetch user by ID from the database
    const [rows] = await conn.query("SELECT * FROM users WHERE id = ?", [id]);
    const user = rows[0];
    done(null, user);
  } catch (error) {
    done(error);
  }
});

app.use(bodyParser.json());

app.get("/menu", async (req, res) => {
  const results = await conn.query("SELECT * FROM recipe");

  res.json(results[0]);
});
app.get("/comments/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const results = await conn.query(
      "SELECT * FROM comments WHERE blog_post_id = ?",
      id
    );
    if (results[0].length > 0) {
      res.json(results[0]);
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
app.post("/comments", async (req, res) => {
  try {
    let comment = req.body;

    const results = await conn.query("INSERT INTO comments SET ?", comment);
    res.json({
      message: "insert complete",
      data: results[0],
    });
  } catch (error) {
    const erroeMessage = error.message || "someth ing wrong";
    const errors = error.errors;
    console.log(error.message);
    res.status(500).json({
      message: erroeMessage,
      errors: errors,
    });
  }
});
app.get("/menu/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const results = await conn.query("SELECT * FROM recipe WHERE id = ?", id);
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

app.get("/searhed/:menu", async (req, res) => {
  try {
    let menu = "%" + req.params.menu + "%";
    const results = await conn.query(
      "SELECT * FROM recipe WHERE menu LIKE ?",
      menu
    );

    if (results[0].length > 0) {
      res.json(results[0]);
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
app.delete("/menu/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const results = await conn.query("DELETE from  recipe  WHERE id = ?", [id]);
    res.json({
      message: "delete complete",
      data: results[0],
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "something wrong",
    });
  }
});
app.get("/auth/:username", async (req, res) => {
  let username = req.params.username;
  const results = await conn.query(
    "SELECT * FROM recipe WHERE writer = ?",
    username
  );
  res.json(results[0]);
});
app.post("/menu", async (req, res) => {
  try {
    let user = req.body;

    const results = await conn.query("INSERT INTO recipe SET ?", user);
    res.json({
      message: "insert complete",
      data: results[0],
    });
  } catch (error) {
    const erroeMessage = error.message || "someth ing wrong";
    const errors = error.errors;
    console.log(error.message);
    res.status(500).json({
      message: erroeMessage,
      errors: errors,
    });
  }
});
app.put("/menu/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let updatemanu = req.body;
    const results = await conn.query("UPDATE  recipe SET ? WHERE id = ?", [
      updatemanu,
      id,
    ]);
    res.json({
      message: "update complete",
      data: results[0],
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "something wrong",
    });
  }
});
app.put("/comment/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let updatescore = req.body.sum_score;
    updatescore = parseInt(updatescore);
    const results = await conn.query(
      "UPDATE recipe SET sum_score = sum_score + ? WHERE id = ?",
      [updatescore, id]
    );
    const res = await conn.query(
      "UPDATE recipe SET commenter = commenter + 1 WHERE id = ?",
      id
    );

    res.json({
      message: "update complete",
      data: [results[0], res[0]],
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "something wrong",
    });
  }
});
// You can add more routes here...

// Start the server
app.listen(port, async () => {
  await initMySQL();
  console.log("Server running on port " + port);
});
