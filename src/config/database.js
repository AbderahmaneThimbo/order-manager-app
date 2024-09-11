const mysql = require('mysql2');
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Thimbo",
  database: 'order_manager'
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

module.exports = db;