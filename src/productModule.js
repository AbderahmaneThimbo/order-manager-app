const db = require("./config/database");

function addProduct(
  name,
  description,
  price,
  stock,
  category,
  barcode,
  status
) {
  try {
    const query =
      "INSERT INTO products (name, description, price, stock, category, barcode, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(
      query,
      [name, description, price, stock, category, barcode, status],
      (err, result) => {
        if (err) {
          console.error("Erreur lors de l'ajout du poduit:", err.message);
          return;
        }
        console.log("Produit est ajouté avec succès! ID:", result.insertId);
      }
    );
  } catch (error) {
    console.error("Erreur inattendue:", error.message);
  }
}

function listProduct() {
  try {
    const query = "SELECT * FROM products";
    db.query(query, (err, results) => {
      if (err) {
        console.error(
          "Erreur lors de la récupération des produits:",
          err.message
        );
        return;
      }
      console.log("Liste des produits:", results);
    });
  } catch (error) {
    console.error("Erreur inattendue:", error.message);
  }
}

function updateProduct(
  id,
  name,
  description,
  price,
  stock,
  category,
  barcode,
  status
) {
  try {
    const query =
      "UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category = ?, barcode = ?, status = ? WHERE id = ?";
    db.query(
      query,
      [name, description, price, stock, category, barcode, status, id],
      (err, result) => {
        if (err) {
          console.error(
            "Erreur lors de la mise à jour du produit:",
            err.message
          );
          return;
        }
        if (result.affectedRows === 0) {
          console.log("Aucun produit trouvé avec cet ID.");
        } else {
          console.log("Produit mis à jour avec succès!");
        }
      }
    );
  } catch (error) {
    console.error("Erreur inattendue:", error.message);
  }
}

function deleteProduct(id) {
  try {
    const query = "DELETE FROM products WHERE id = ?";
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Erreur lors de la suppression du produit:", err.message);
        return;
      }
      if (result.affectedRows === 0) {
        console.log("Aucun produit trouvé avec cet ID.");
      } else {
        console.log("Produit supprimé ave  succés");
      }
    });
  } catch (error) {
    console.error("Erreur inattendue:", error.message);
  }
}
module.exports = {
  addProduct,
  listProduct,
  updateProduct,
  deleteProduct
};
