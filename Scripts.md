# Exécution, vérification et Description des différents scripts

## Exécution des scripts

Sur le serveur ligone, pour que tout fonctionne il faut exécuter 1 script : ``checkScripts.sh``<br>
Pour le lancer, aller la ou se trouve ce script et faite : ``nohup sh checkScripts.sh &``<br>

## Vérifier l'éxécution du scripts

Dans le terminal linux, faire cette commande :
``pgrep -x $Service`` avec le $Service = node, bash, python3, etc ...<br>
Si celui-ci vous retourne une valeur (quelque chose comme 14589, qui est un PID) alors le service est actuellement en cours.<br>
Sinon c'est que le scripts associé n'est pas lancé.

## Description des scripts

### checkScripts.sh

Ce script bash vérifie le fonctionnement des scripts nécéssaire a notre site web et les relance si besoin.<br>
Il fait un tour de vérification tout les 15 minutes (modifiable).

### startapi.js

Ce script javascript permet de lancer notre api.<br>
C'est avec lui que le site web communique pour faire :

- De la lemmatisation
- De la recherche de pictogramme

### index.js

Ce script javascript est utilisé dans par notre site web afin de faire des requêtes a l'api et de récupérer la réponse.

### lemma.py

Ce script python est éxecuté par l'api afin de lemmatiser le mot ou la phrase envoyé.<br>
Ce script récupère la phrase et l'envoie au serverLemma.py puis attend la réponse et donne le résultat à l'api.<br>
Si jamais il n'arrive pas a communiqué avec le serverLemma, alors il exécute le scripts bash ``restartServerLemma.sh`` qui permet de relancer instantanément le serverLemma.

### serverLemma.py

Ce script python permet de faire la lemmatisation du mot ou de la phrase passé en paramètre.<br>
Celui-ci utilise la bibliothèque Spacy de python.<br>

### restartApi.sh et restartServerLemma.sh

Ces 2 scripts bash, comme leurs nom l'indique, permettent de relance les services associé si ils ne sont pas en état de fonctionnement.
