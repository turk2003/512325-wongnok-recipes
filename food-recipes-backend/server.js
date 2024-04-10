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
      password: "your_password",
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

// Routes
app.post("/login", passport.authenticate("local"), (req, res) => {
  // If authentication succeeds, this function will be called
  res.json({ message: "Login successful", user: req.user });
});

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

    // Store the username and hashed password in the database
    await conn.query("INSERT INTO users (username, password) VALUES (?, ?)", [
      username,
      hashedPassword,
    ]);

    res.json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.use(bodyParser.json());

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
app.get("/menu2/:menu", async (req, res) => {
  try {
    let menu = req.params.menu;
    const results = await conn.query(
      "SELECT * FROM recipes WHERE menu = ?",
      menu
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
app.delete("/menu/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const results = await conn.query("DELETE from  recipes  WHERE id = ?", [
      id,
    ]);
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
    "SELECT * FROM recipes WHERE writer = ?",
    username
  );
  res.json(results[0]);
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
    const results = await conn.query("UPDATE  recipesz SET ? WHERE id = ?", [
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
// You can add more routes here...

// Start the server
app.listen(port, async () => {
  await initMySQL();
  console.log("Server running on port " + port);
});
