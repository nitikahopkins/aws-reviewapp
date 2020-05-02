require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PORT = 3000;
const app = express();
const path = require("path");
//const mysql = require("mysql");
const mysql = require("mysql2/promise");
const { host, user, password } = require("./credentials");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("."));

// const con = mysql.createConnection({
//   host: "database-2.c5aaevzkfdj2.us-east-2.rds.amazonaws.com",
//   user: "admin",
//   password: "test.wow",
// });

const con = mysql.createPool({
  host,
  user,
  password,
});

app.get("/register", (_req, res) => {
  res.sendFile(path.join(__dirname + "/register.html"));
});

app.post("/register", async (req, res) => {
  console.log("POST USERS");
  try {
    const result = await con.query(
      `INSERT INTO shareYourViews.users (username, email, password, state, city) VALUES ('${req.query.username}', '${req.query.email}', '${req.query.password}', '${req.query.state}', '${req.query.city}')`
    );
    res.send(result[0]);
  } catch (error) {
    res.send(error);
    console.error(error);
  }
});

app.get("/users/login", (_req, res) => {
  res.sendFile(path.join(__dirname + "/src/users/views/login.html"));
});

app.post("/users/login", async (req, res) => {
  //console.log(req.body);
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(403).send("Field cannot be empty");
  }
  try {
    const result = await con.query(
      `SELECT username, password FROM shareYourViews.users WHERE username='${username}' AND password='${password}' LIMIT 1`
    );
    console.log(result);
    if (!result || !result[0] || !result[0].length) {
      res.status(403).send("Incorrect Credentials");
    }
    res.redirect("/loggedin");
    // res.sendFile(path.join(__dirname + "/login.html"));
  } catch (error) {
    res.status(500).send(error.message);
    // console.error(error);
  }
});

app.get("/loggedin", (_req, res) => {
  res.sendFile(path.join(__dirname + "/loggedin.html"));
});

//creating hashed password when creating USER
// app.post("/users", async (req, res) => {
//   console.log("POST USERS");
//   try {
//     const result = await con.query(
//       `INSERT INTO shareYourViews.users (username, email, password, state, city) VALUES ('${req.query.username}', '${req.query.email}', '${req.quesry.password}', '${req.query.state}', '${req.query.city}')`
//     );
//     res.send(result[0]);
//   } catch (error) {
//     res.status(500).send(error);
//     console.log(error);
//   }
// });

// app.get("/", async (_req, res) => {
//   try {
//     //const result = await con.query(`SELECT * FROM shareYourViews.users`);
//     res.sendFile(path.join(__dirname + "/home.html"));
//   } catch (error) {
//     res.send(error);
//     console.error(error);
//   }
// });

// app.get("/", async (_req, res) => {
//   try {
//     //const result = await con.query(`SELECT * FROM shareYourViews.users`);
//     res.sendFile(path.join(__dirname + "/login.html"));
//   } catch (error) {
//     res.send(error);
//     console.error(error);
//   }
// });

// // app.post("/users/login", async (req, res) => {
// //   console.log(req.body);
// //   const user = users.find((user) => user.username === req.body.username);
// //   if (user === null) {
// //     return res.sendStatus(400).send("cannot find user");
// //   } else {
// //     try {
// //       if (await bcrypt.compare(req.body.password, user.password)) {
// //         const username = req.body.username;
// //         const user = { username: username };
// //         const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
// //         res.json({ accessToken: accessToken });

// //         res
// //           .status(200)
// //           .cookie("blogAccessToken", accessToken)
// //           .redirect(301, "/users/loggedin");

// //         // res.status(301).redirect("/loggedin");
// //         // res.send({ status: "success" });
// //       } else {
// //         res.status(403).send({ status: "username incorrect" });
// //       }
// //     } catch (error) {
// //       res.status(500).send();
// //     }
// //   }
// // });

// app.get("/loggedin", async (_req, res) => {
//   try {
//     //const result = await con.query(`SELECT * FROM shareYourViews.users`);
//     res.sendFile(path.join(__dirname + "/loggedin.html"));
//   } catch (error) {
//     res.send(error);
//     console.error(error);
//   }
// });

// app.get("/users", async (_req, res) => {
//   try {
//     //const result = await con.query(`SELECT * FROM shareYourViews.users`);
//     res.sendFile(path.join(__dirname + "/users.html"));
//   } catch (error) {
//     res.send(error);
//     console.error(error);
//   }
// });

// app.get("/user", async (req, res) => {
//   try {
//     const result = await con.query(
//       `SELECT * FROM shareYourViews.users WHERE username='${req.query.username}'`
//     );
//     res.send(result[0]);
//   } catch (error) {
//     res.send(error);
//     console.error(error);
//   }
// });

// app.put("/users", async (req, res) => {
//   try {
//     const result = await con.query(
//       `UPDATE shareYourViews.users SET username = '${req.query.username}' WHERE id = '${req.query.id}'`
//     );
//     res.send(result[0]);
//   } catch (error) {
//     res.send(error);
//     console.error(error);
//   }
// });

// app.delete("/users", async (req, res) => {
//   console.log("DELETE USER");
//   try {
//     const result = await con.query(
//       `DELETE FROM shareYourViews.users WHERE username = '${req.query.username}'`
//     );
//     res.send(result[0]);
//   } catch (error) {
//     res.send(error);
//     console.error(error);
//   }
// });

// // app.post("/blogPosts", async (request, response) => {
// //   try {
// //     console.log(request.body);
// //     const newBlog = new BlogPostModel(request.body);
// //     const createBlog = await BlogPostModel.create(newBlog);
// //     response.status(303).redirect("/users/landing");
// //   } catch (error) {
// //     response.status(500).send(error);
// //     console.log(error);
// //   }
// // });

// //Logout
// // app.post("/logout", async (request, response) => {
// //   try {
// //     response.status(200).cookie("blogAccessToken", "").redirect(303, "/");
// //   } catch (error) {
// //     response.status(500).send(error);
// //   }
// // });

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
