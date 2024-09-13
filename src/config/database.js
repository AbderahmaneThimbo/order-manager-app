const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Thimbo",
  database: "order_manager"
});

// try {
//   db.connect(function(err) {
//     if (err) {
//       console.error("Erreur de connexion à la base de données :", err.message);
//       return;
//     }
//     console.log("Connecté à la base de données MySQL !");
//   });
// } catch (err) {
//   console.error(
//     "Erreur inattendue lors de la tentative de connexion :",
//     err.message
//   );
// }

module.exports = db;
