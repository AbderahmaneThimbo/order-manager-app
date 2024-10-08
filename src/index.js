const readline = require("readline");
const customers = require("./customerModule");
const products = require("./productModule");
const orders = require("./orderModule");
const payments = require("./paymentModule");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log(`
      1. Gérer les clients
      2. Gérer les produits
      3. Gérer les commandes
      4. Gérer les paiements
      5. Quitter
    `);

  rl.question("Choisissez une option: ", option => {
    switch (option) {
      case "1":
        manageCustomers();
        break;
      case "2":
        manageProducts();
        break;
      case "3":
        manageOrders();
        break;
      case "4":
        managePayments();
        break;
      case "5":
        console.log("Bye");
        process.exit(0);

      default:
        console.log("Option invalide.");
        showMenu();
    }
  });
}

function manageCustomers() {
  console.log(`
    1. Ajouter un client
    2. Lister les clients
    3. Mettre à jour un client
    4. Supprimer un client
    5. Retour au menu principal
  `);

  rl.question("Choisissez une option: ", option => {
    switch (option) {
      case "1":
        rl.question("Entrez le nom du client: ", name => {
          rl.question("Entrez l'adresse du client: ", address => {
            rl.question("Entrez l'email du client: ", email => {
              rl.question("Entrez le téléphone du client: ", phone => {
                customers.addCustomer(name, address, email, phone);
                setTimeout(manageCustomers, 100);
              });
            });
          });
        });
        break;
      case "2":
        customers.listCustomer();
        setTimeout(manageCustomers, 100);
        break;
      case "3":
        rl.question("Entrez l'ID du client à mettre à jour: ", id => {
          rl.question("Entrez le nouveau nom: ", name => {
            rl.question("Entrez la nouvelle adresse: ", address => {
              rl.question("Entrez le nouvel email: ", email => {
                rl.question("Entrez le nouveau téléphone: ", phone => {
                  customers.updateCustomer(id, name, address, email, phone);
                  setTimeout(manageCustomers, 100);
                });
              });
            });
          });
        });
        break;
      case "4":
        rl.question("Entrez l'ID du client à supprimer: ", id => {
          customers.deleteCustomer(id);
          setTimeout(manageCustomers, 100);
        });
        break;
      case "5":
        showMenu();
        break;
      default:
        console.log("Option invalide.");
        setTimeout(manageCustomers, 100);
    }
  });
}

function manageProducts() {
  console.log(`
    1. Ajouter un produit
    2. Lister les produits
    3. Mettre à jour un produit
    4. Supprimer un produit
    5. Retour au menu principal
  `);

  rl.question("Choisissez une option: ", option => {
    switch (option) {
      case "1":
        rl.question("Entrez le nom du produit: ", name => {
          rl.question("Entrez la description du produit: ", description => {
            rl.question("Entrez le prix du produit: ", price => {
              rl.question("Entrez la quantité en stock du produit: ", stock => {
                rl.question("Entrez la catégorie du produit: ", category => {
                  rl.question("Entrez le code-barre du produit: ", barcode => {
                    rl.question("Entrez le statut du produit: ", status => {
                      products.addProduct(
                        name,
                        description,
                        price,
                        stock,
                        category,
                        barcode,
                        status
                      );
                      setTimeout(manageProducts, 100);
                    });
                  });
                });
              });
            });
          });
        });
        break;
      case "2":
        products.listProduct();
        setTimeout(manageProducts, 100);
        break;
      case "3":
        rl.question("Entrez l'ID du produit à mettre à jour: ", id => {
          rl.question("Entrez le nouveau nom: ", name => {
            rl.question("Entrez la nouvelle description: ", description => {
              rl.question("Entrez le nouveau prix: ", price => {
                rl.question("Entrez le nouveau stock: ", stock => {
                  rl.question("Entrez la nouvelle catégorie: ", category => {
                    rl.question("Entrez le nouveau barcode: ", barcode => {
                      rl.question("Entrez le nouveau statut: ", status => {
                        products.updateProduct(
                          id,
                          name,
                          description,
                          price,
                          stock,
                          category,
                          barcode,
                          status
                        );
                        setTimeout(manageProducts, 100);
                      });
                    });
                  });
                });
              });
            });
          });
        });
        break;
      case "4":
        rl.question("Entrez l'ID du produit à supprimer: ", id => {
          products.deleteProduct(id);
          setTimeout(manageProducts, 100);
        });
        break;
      case "5":
        showMenu();
        break;
      default:
        console.log("Option invalide.");
        setTimeout(manageProducts, 100);
    }
  });
}

function manageOrders() {
  console.log(`
    1. Ajouter une commande
    2. Liste des commandes
    3. Voir les details d'une commande
    4. Mettre à jour une commande
    5. Supprimer une commande
    6. Retour au menu principal
  `);

  rl.question("Choisissez une option: ", option => {
    switch (option) {
      case "1":
        rl.question("Entrez la date de la commande (YYYY-MM-DD): ", date => {
          rl.question("Entrez l'ID du client: ", customer_id => {
            rl.question("Entrez l'adresse de livraison: ", delivery_address => {
              rl.question("Entrez le numéro de suivi: ", track_number => {
                rl.question("Entrez le statut de la commande: ", status => {
                  const orderDetails = [];

                  const addOrderDetailPrompt = () => {
                    rl.question("Entrez l'ID du produit: ", product_id => {
                      rl.question("Entrez la quantité: ", quantity => {
                        rl.question("Entrez le prix unitaire: ", price => {
                          orderDetails.push({
                            product_id: product_id,
                            quantity,
                            price
                          });

                          rl.question(
                            "Voulez-vous ajouter un autre détail ? (oui/non) ",
                            answer => {
                              if (answer.toLowerCase() === "oui") {
                                addOrderDetailPrompt();
                              } else {
                                confirmSaveOrder();
                              }
                            }
                          );
                        });
                      });
                    });
                  };

                  const confirmSaveOrder = () => {
                    rl.question(
                      "Voulez-vous enregistrer cette commande ? (oui/non) ",
                      confirmation => {
                        if (confirmation.toLowerCase() === "oui") {
                          orders.addOrder(
                            date,
                            customer_id,
                            delivery_address,
                            track_number,
                            status,
                            orderDetails
                          );
                        } else {
                          console.log("Commande annulée.");
                        }
                        setTimeout(manageOrders, 100);
                      }
                    );
                  };

                  rl.question(
                    "Voulez-vous ajouter des détails à cette commande ? (oui/non) ",
                    answer => {
                      if (answer.toLowerCase() === "oui") {
                        addOrderDetailPrompt();
                      } else {
                        console.log(
                          "Vous devez ajouter au moins un détail pour enregistrer la commande."
                        );
                        setTimeout(manageOrders, 100);
                      }
                    }
                  );
                });
              });
            });
          });
        });
        break;
      case "2":
        orders.listOrder();
        setTimeout(manageOrders, 100);
        break;

      case "3":
        rl.question(
          "Entrez l'ID de la commande à afficher avec ses détails: ",
          order_id => {
            orders.getOrderById(order_id);
            setTimeout(manageOrders, 100);
          }
        );
        break;

      case "4":
        rl.question(
          "Entrez l'ID de la commande à mettre à jour: ",
          order_id => {
            rl.question(
              "Entrez la nouvelle date de la commande (YYYY-MM-DD): ",
              order_date => {
                rl.question("Entrez l'ID du client: ", customer_id => {
                  rl.question(
                    "Entrez la nouvelle adresse de livraison: ",
                    delivery_address => {
                      rl.question(
                        "Entrez le nouveau numéro de suivi: ",
                        track_number => {
                          rl.question(
                            "Entrez le nouveau statut de la commande: ",
                            status => {
                              const newOrderDetails = [];

                              function askForOrderDetails() {
                                rl.question(
                                  "Entrez l'ID du produit: ",
                                  product_id => {
                                    rl.question(
                                      "Entrez la quantité: ",
                                      quantity => {
                                        rl.question(
                                          "Entrez le prix unitaire: ",
                                          price => {
                                            newOrderDetails.push({
                                              product_id: parseInt(product_id),
                                              quantity: parseInt(quantity),
                                              price: parseFloat(price)
                                            });
                                            rl.question(
                                              "Voulez-vous ajouter un autre détail de commande ? (oui/non) ",
                                              answer => {
                                                if (
                                                  answer.toLowerCase() === "oui"
                                                ) {
                                                  askForOrderDetails();
                                                } else {
                                                  orders.updateOrder(
                                                    order_id,
                                                    order_date,
                                                    customer_id,
                                                    delivery_address,
                                                    track_number,
                                                    status,
                                                    newOrderDetails
                                                  );
                                                  setTimeout(manageOrders, 100);
                                                }
                                              }
                                            );
                                          }
                                        );
                                      }
                                    );
                                  }
                                );
                              }

                              askForOrderDetails();
                            }
                          );
                        }
                      );
                    }
                  );
                });
              }
            );
          }
        );
        break;

      case "5":
        rl.question("Entrez l'ID de la commande à supprimer: ", order_id => {
          orders.deleteOrder(order_id);
          setTimeout(manageOrders, 100);
        });
        break;

      case "6":
        showMenu();
        break;

      default:
        console.log("Option invalide.");
        setTimeout(manageOrders, 100);
    }
  });
}

function managePayments() {
  console.log(`
    1. Ajouter un paiement
    2. Lister les paiemnet
    3. Mettre à jour un paiement
    4. Supprimer un paiement
    5. Retour au menu principal
  `);

  rl.question("Choisissez une option: ", option => {
    switch (option) {
      case "1":
        rl.question("Entrez la date du paiement (YYYY-MM-DD): ", date => {
          rl.question("Entrez l'id du commande: ", order_id => {
            rl.question("Entrez le montant du paiement: ", amount => {
              rl.question("Entrez la methode du paiement: ", payment_method => {
                payments.addPayment(date, order_id, amount, payment_method)
                setTimeout(managePayments, 100);
              });
            });
          });
        });
        break;

      case "2":
        payments.listPayment();
        setTimeout(managePayments, 100);
        break;

      case "3":
        rl.question("Entrez l'ID du paiement à mettre à jour: ", id => {
          rl.question("Entrez la nouvelle date (YYYY-MM-DD):", date => {
            rl.question("Entrez le nouvel ID de commande: ", order_id => {
              rl.question("Entrez le nouveau montant: ", amount => {
                rl.question(
                  "Entrez la nouvelle methode du paiement: ",
                  payment_method => {
                    payments.updatePayment(
                      id,
                      date,
                      order_id,
                      amount,
                      payment_method
                    );
                    setTimeout(managePayments, 100);
                  }
                );
              });
            });
          });
        });
        break;

      case "4":
        rl.question("Entrez l'ID du paiement à supprimer: ", id => {
          payments.deletePayment(id);
          setTimeout(managePayments, 100);
        });
        break;

      case "5":
        showMenu();
        break;

      default:
        console.log("Option invalide. Veuillez choisir une option valide.");
        setTimeout(managePayments, 100);
    }
  });
}

showMenu();
