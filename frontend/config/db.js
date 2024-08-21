const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "sql5.freesqldatabase.com",
    user: "sql5727106",
    port: "3306",
    password: "kUcuNKbnJK",
    database: "sql5727106"
});

db.connect(err => {
   if (err) {
       console.error("Error connecting", err);
   } else {
       console.log("Connected Successfully");
   }
});

module.exports = db;
