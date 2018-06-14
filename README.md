# Projet - NewsFeed

Le but de ce projet est de réaliser une application web affichant un flux de news relatif à un sujet spécifique.

*Il est réalisable soit seul, soit par groupe de 2 personnes maximum.*

La récupération des données d'actualités se fera à l'aide de https://newsapi.org/, 
**attention** : pour réaliser ce projet il est donc nécessaire d'obtenir une API_KEY sur https://newsapi.org/register.

Ce projet sera composé de deux parties :

  - Un **back-end** : Une API récupérant les dernières news sur **newsapi.org* et les mettant à disposition au format JSON.
  - Un **front-end** : Une web application affichant les données fournies par le back-end
  
 ## Le Back-End
 
 Le back-end pourra utiliser n'importe quelle bibliothèque pour gérer les requêtes HTTP. 
 Express est conseillé est sera celle utilisée au sein du cours, mais libre à vous de tester d'autres solutions si le coeur vous en dit.
 
 Il est nécessaire d'implémenter sur votre back-end au moins ces deux routes :
 
 *MÉTHODE     ROUTE       PARAMÈTRES      DESCRIPTION*
 GET          /news                       Retourner l'ensemble des news de votre tableau de news
 GET          /news/:id                   Retourner la news en position **id** de votre tableau de news
 
Il est également nécessaire d'implémenter une WebSocket sur le serveur, qui enverra un message à tous ses clients connectés à la 
récupération d'un nouveau message.

## Le Front-End

Les dépendances de la boilerplate s'installent avec 
> npm install

Le front-end doit être réalisé en HTML/CSS et JavaScript.

**Le nombre de fonctionnalités, la qualité du code et du design global seront pris en compte dans la note globale du projet !**

Il doit présenter au moins deux vues : une vue présentant l'ensemble des messages reçus de l'API et une vue permettant 
d'afficher le contenu d'un seul message après avoir cliqué dessus.
