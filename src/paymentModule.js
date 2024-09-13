const db = require('./config/database');

function addPayment(date, order_id, amount, payment_method) {
    try {
        const query = 'INSERT INTO payments (date, order_id, amount, payment_method) VALUES (?, ?, ?, ?)';
        db.query(query, [date, order_id, amount, payment_method], (err, result) => {
        if (err) {
            console.error('Erreure lors de l\'ajout du paiement:', err.message);
            return;
        }
        console.log('Paiement ajouté avec succès! ID:', result.insertId);
    });
    } catch (error) {
        console.error('Erreur inattendue:', error.message);
    }
}

function listPayment() {
    try {
        const query = 'SELECT * FROM payments';
        db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des paiements:', err.message);
            return;
        }
        console.log('Liste des paiements:', results);
    });
    } catch (error) {
        console.error('Erreur inattendue:', error.message);
    }
}

function updatePayment(id, date, order_id, amount, payment_method) {
    try {
        const query = 'UPDATE payments SET date = ?, order_id = ?, amount = ?, payment_method = ? WHERE id = ?';
        db.query(query, [date, order_id, amount, payment_method, id], (err, result) => { 
        if (err) {
            console.error('Erreur lors de la mis à jour du paiement:', err.message);
            return;
        }
        if (result.affectedRows === 0) {
            console.log('Aucun paiement retrouvé avec cet ID.');
        } else {
            console.log('Paiement mid à jour avec succès!');
        }
    });
    } catch (error) {
        console.error('Erreur inattendue:', error.message);
    }
}

function deletePayment(id) {
    try {
        const query = 'DELETE FROM payments WHERE id = ?';
        db.query(query, [id], (err, result) => { 
        if (err) {
            console.error('Erreur lors de la suppression du paiement:', err.message);
            return;
        }
        if (result.affectedRows === 0) {
            console.log('Aucun paiement retrouvé avec cet ID.');
        } else {
            console.log('Paiement supprimé avec succès!');
            
        }
    });
    } catch (error) {
        console.error('Erreur inattendue:', error.message);
    }
}


module.exports = {
    addPayment,
    listPayment,
    updatePayment,
    deletePayment
};