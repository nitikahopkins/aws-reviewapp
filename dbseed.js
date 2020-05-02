const mysql = require("mysql");

const { host, user, password } = require("./credentials");

const con = mysql.createConnection({
  host: "database-2.c5aaevzkfdj2.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "test.wow",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  //   con.end();
  // });

  con.query("CREATE DATABASE IF NOT EXISTS shareYourViews;");
  con.query("USE shareYourViews");
  con.query(
    "CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT, username varchar(30), email varchar(255), password varchar(55), state varchar(100), city varchar(100), PRIMARY KEY(id));",
    function (error, result, fields) {
      console.log(result);
    }
  );

  con.query(
    "CREATE TABLE IF NOT EXISTS reviews (id INT NOT NULL AUTO_INCREMENT UNIQUE, userId INT NOT NULL, title VARCHAR(75) NOT NULL, blog VARCHAR(4000), blogdate DATE NOT NULL, PRIMARY KEY (id), FOREIGN KEY (userId) REFERENCES users(id));",
    (err, results, fields) => {
      if (err) throw err;
      console.log(results);
    }
  );
  //   con.query(
  //     "CREATE TABLE IF NOT EXISTS reviews(id int NOT NULL AUTO_INCREMENT, BusinessName varchar(100), date varchar(20), reviews varchar(2000), usersid int REFERENCES users(id), PRIMARY KEY(id));",
  //     function (error, result, fields) {
  //       console.log(result);
  //     }
  //   );
  con.end();
});
