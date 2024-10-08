const db = require("./config/database");

function addOrder(
  date,
  customer_id,
  delivery_address,
  track_number,
  status,
  orderDetails
) {
  try {
    const validProductCheck = orderDetails.map(detail =>
      checkProductExists(detail.product_id)
    );
    Promise.all(validProductCheck)
      .then(results => {
        if (results.every(exists => exists)) {
          const query =
            "INSERT INTO purchase_orders (date, customer_id, delivery_address, track_number, status) VALUES (?, ?, ?, ?, ?)";
          db.query(
            query,
            [date, customer_id, delivery_address, track_number, status],
            (err, result) => {
              if (err) {
                console.error(
                  "Erreur lors de l'ajout de la commande:",
                  err.message
                );
                return;
              }

              console.log("Commande ajoutée avec succès ID:", result.insertId);

              const orderId = result.insertId;
              orderDetails.forEach(detail => {
                addOrderDetail(
                  orderId,
                  detail.product_id,
                  detail.quantity,
                  detail.price
                );
              });
            }
          );
        } else {
          console.error(
            "La commande ne peut pas être ajoutée car un ou plusieurs produits n'existent pas."
          );
        }
      })
      .catch(error => {
        console.error(
          "Erreur lors de la vérification des produits:",
          error.message
        );
      });
  } catch (error) {
    console.error("Erreur inattendue:", error.message);
  }
}

function listOrder() {
  try {
    const query = "SELECT * FROM purchase_orders";
    db.query(query, (err, results) => {
      if (err) {
        console.error(
          "Erreur lors de la récupération des commandes:",
          err.message
        );
        return;
      }
      console.log("Liste des commandes:", results);
    });
  } catch (error) {
    console.error("Erreur inattendue:", error.message);
  }
}

function getOrderById(order_id) {
  try {
    const queryOrder = "SELECT * FROM purchase_orders WHERE id = ?";
    db.query(queryOrder, [order_id], (err, orderResults) => {
      if (err) {
        console.error(
          "Erreur lors de la récupération de la commande:",
          err.message
        );
        return;
      }
      if (orderResults.length === 0) {
        console.log("Aucune commande trouvée avec cet ID.");
        return;
      }
      const order = orderResults[0];

      const queryDetails = "SELECT * FROM order_details WHERE order_id = ?";
      db.query(queryDetails, [order_id], (err, detailsResults) => {
        if (err) {
          console.error(
            "Erreur lors de la récupération des détails de la commande:",
            err.message
          );
          return;
        }
        order.details = detailsResults;
        console.log("Commande avec détails:", JSON.stringify(order, null, 2));
      });
    });
  } catch (error) {
    console.error("Erreur inattendue:", error.message);
  }
}

function updateOrder(
  order_id,
  date,
  customer_id,
  delivery_address,
  track_number,
  status,
  orderDetails
) {
  try {
    const checkQuery = "SELECT * FROM purchase_orders WHERE id = ?";
    db.query(checkQuery, [order_id], (err, checkResult) => {
      if (err) {
        console.error(
          "Erreur lors de la vérification de la commande:",
          err.message
        );
        return;
      }

      if (checkResult.length === 0) {
        console.log("Aucune commande trouvée avec cet ID.");
        return;
      }
      const validProductCheck = orderDetails.map(detail =>
        checkProductExists(detail.product_id)
      );
      Promise.all(validProductCheck)
        .then(results => {
          if (results.every(exists => exists)) {
            const updateQuery =
              "UPDATE purchase_orders SET date = ?, customer_id = ?, delivery_address = ?, track_number = ?, status = ? WHERE id = ?";
            db.query(
              updateQuery,
              [
                date,
                customer_id,
                delivery_address,
                track_number,
                status,
                order_id
              ],
              (err, result) => {
                if (err) {
                  console.error(
                    "Erreur lors de la mise à jour de la commande:",
                    err.message
                  );
                  return;
                }

                console.log("Commande mise à jour avec succès!");

                orderDetails.forEach(detail => {
                  const updateDetailQuery =
                    "UPDATE order_details SET product_id = ?, quantity = ?, price = ? WHERE order_id = ? AND id = ?";
                  db.query(
                    updateDetailQuery,
                    [
                      detail.product_id,
                      detail.quantity,
                      detail.price,
                      order_id,
                      detail.id
                    ],
                    (err, detailResult) => {
                      if (err) {
                        console.error(
                          "Erreur lors de la mise à jour du détail de la commande:",
                          err.message
                        );
                      } else {
                        console.log(
                          "Détail de commande mis à jour avec succès!"
                        );
                      }
                    }
                  );
                });
              }
            );
          } else {
            console.error(
              "La mise à jour de la commande ne peut pas être effectuée car un ou plusieurs produits n'existent pas."
            );
          }
        })
        .catch(error => {
          console.error(
            "Erreur lors de la vérification des produits:",
            error.message
          );
        });
    });
  } catch (error) {
    console.error("Erreur inattendue:", error.message);
  }
}

function deleteOrder(id) {
  try {
    const deleteDetailsQuery = "DELETE FROM order_details WHERE order_id = ?";
    db.query(deleteDetailsQuery, [id], (err, result) => {
      if (err) {
        console.error(
          "Erreur lors de la suppression des détails de commande:",
          err.message
        );
        return;
      }
      const deleteOrderQuery = "DELETE FROM purchase_orders WHERE id = ?";
      db.query(deleteOrderQuery, [id], (err, result) => {
        if (err) {
          console.error(
            "Erreur lors de la suppression de la commande:",
            err.message
          );
          return;
        }
        if (result.affectedRows === 0) {
          console.log("Aucune commande trouvée avec cet ID.");
        } else {
          console.log("Commande et ses détails supprimés avec succès");
        }
      });
    });
  } catch (error) {
    console.error("Erreur inattendue:", error.message);
  }
}

function addOrderDetail(order_id, product_id, quantity, price) {
  try {
    const query =
      "INSERT INTO order_details (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)";
    db.query(query, [order_id, product_id, quantity, price], (err, result) => {
      if (err) {
        console.error(
          "Erreur lors de l'ajout du détail de commande:",
          err.message
        );
        return;
      }
      console.log("Détail ajouté avec succès! ID:", result.insertId);
    });
  } catch (error) {
    console.error("Erreur inattendue:", error.message);
  }
}

function checkProductExists(product_id) {
  return new Promise((resolve, reject) => {
    const query = "SELECT COUNT(*) AS count FROM products WHERE id = ?";
    db.query(query, [product_id], (err, result) => {
      if (err) {
        console.error(
          "Erreur lors de la vérification du produit:",
          err.message
        );
        reject(err);
        return;
      }

      const exists = result[0].count > 0;
      resolve(exists);
    });
  });
}

module.exports = {
  addOrder,
  getOrderById,
  listOrder,
  updateOrder,
  deleteOrder,
  addOrderDetail
};
