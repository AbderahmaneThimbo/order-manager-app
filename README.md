# Order Manager App

## Description

Ce projet est une application de gestion complète des commandes, clients, produits et paiements, développée en Node.js avec une base de données MySQL. Elle permet aux utilisateurs de gérer efficacement leurs opérations commerciales en effectuant des tâches telles que l'ajout, la mise à jour, la suppression et l'affichage de diverses entités.


## Fonctionnalités Principales

- Gestion des Clients : Ajouter, mettre à jour, lister et supprimer des clients.
- Gestion des Commandes : Créer de nouvelles commandes, afficher les détails des commandes, mettre à jour les commandes existantes, et supprimer les commandes.
- Gestion des Produits : Ajouter, lister, mettre à jour et supprimer des produits.
- Gestion des Paiements : Ajouter, lister, mettre à jour et supprimer des paiements associés aux commandes.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

    Node.js 
    Mysql 

## Installation

Suivez ces étapes pour configurer le projet sur votre machine locale :

**Clonez le repository :**

```bash
 git clone https://github.com/AbderahmaneThimbo/order-manager-app.git 
```

**Accédez au dossier du projet :**

```bash
  cd order-manager-app
```

**Installez les dépendances :**

```bash
   npm install
```



## Configurer le Fichier de Configuration de la Base de Données

### Accédez au fichier **src/config/database.js.**
 adapter les paramètres de connexion à votre environnement MySQL

- Hôte **(Host)** : l'adresse de votre serveur MySQL.
- Utilisateur **(User)** : le nom d'utilisateur de votre base de données MySQL.
- Mot de passe **(Password)** : le mot de passe associé à l'utilisateur.
- Nom de la base de données **(Database name)** : le nom de la base de données que vous avez créée.

## Utilisation

Pour démarrer l'application, exécutez la commande suivante :

```bash
  npm start
```
## Auteur

[Abderahmane Thimbo](https://github.com/AbderahmaneThimbo)

