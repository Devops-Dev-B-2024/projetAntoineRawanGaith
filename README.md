# Projet comparatif : GitlabCI VS Github VS Jenkins

## Présentation générale

Objectif : 
Comparer les 3 outils pour la mise en place d’une chaîne d’intégration continue. Effectuer une analyse comparative des avantages et inconvénients des outils, en prenant en compte l’aspect sécurité.

**Membres** :
+ Antoine TESSIER
+ Rawan ATWE
+ Ghaith BENHADI

**Méthodologie d'analyse** :
1. Préparation d'un projet initial commun.
2. Configuration et mise en place de la chaine CI sur les 3 outils.
3. Mise en commun du travail et analyse comparative.

## 1. Préparation du projet initial
Le projet initial est un serveur HTTP basique, avec une conteneurisation Docker.
+ Le serveur reçoit un GET sur la route principale "/", avec un body composé de deux paramètres a et b.
+ Il réalise l'opération a+b.
+ Si le résultat est inférieur à 10, le serveur renvoi un status 204. Sinon, il renvoi un status 400.
+ Le projet contient un DockerFile permettant de conteneuriser notre serveur.

## 2. Configuration et mise en place de la chaine CI sur les 3 outils
Nous avons chacun mis en place 1 outil pour pouvoir finir le projet dans les temps. Antoine s'est occupé de Github, Rawan de GitlabCI et Ghaith de Jenkins.
### Configuration Github (Antoine)
#### Configuration et sécurisation des branches
**Description** :
J'ai configuré les branches de la manière suivante :
+ Une branche "development" ouvert en push
+ Une branche "main" configuré en pull request only
+ Review par un collaborateur obligatoire pour valider un pull request

**Problèmes ou difficultés rencontrés** :
Etant un novice de Github (et même Git en général), la prise en main était plus ou moins fastidieuse. Il m’a fallu un peu de temps pour comprendre les mécanismes d’un repo (sécurisation des branches et configuration d’un workflow) et l’utilité de chaque fonctionnalité.
#### Configuration du workflow avec Github Actions
**Description** :
J'ai configuré un repo Github Action avec les jobs suivants :
+ Initialise les packages npm et installe les dépendances
+ Lance les tests unitaires
+ Build l’image Docker du projet avec un dockerfile

**Problèmes ou difficultés rencontrés** :
J’ai réussi à configurer le repo comme je le souhaitais, mais je me suis retrouvé confronté à un problème qui ne devrait pas arriver. Etant en mode découverte, j’ai du modifier à plusieurs reprise le workflow. Mais pour le valider, je devais forcer le push sur main car l’ancien ne passait pas les tests. Ducoup je me suis retrouvé avec la branche development qui n’était pas à jour par rapport à main et j’ai du merge main vers development, ce qui n’est pas normal dans un projet. Avec du recul, je comprend mon erreur : Je pensais que le workflow était lié au repo global et non à une branche spécifique à chaque fois. En fait, même la configuration du workflow doit être fait sur development avant d’être merge sur main.
Grâce à cette erreur, je comprend mieux la mécanique et le fonctionnement de Git et Github Actions, je ne referais pas l’erreur.
#### Test et résultat
![screen1](https://github.com/Devops-Dev-B-2024/projetAntoineRawanGaith/assets/113984329/be83c8ec-c112-46df-ac3e-75a29cf219e1)
![screen2](https://github.com/Devops-Dev-B-2024/projetAntoineRawanGaith/assets/113984329/ed2817f8-c1e2-4a13-9f4d-5a0628383850)
Pour valider une merge pull request, il y a bien les 2 étapes à valider : review d’un dev et validation du workflow.
Dans l’exemple, le workflow a été exécuté avec succès et nous pouvons voir le détail des différentes étapes (install npm, test et build).
### Configuration GitlabCI (Rawan)
#### Configuration et sécurisation des branches
**Description** :
J'ai configuré les branches de la manière suivante :
+ Une branche "development" ouvert en push
+ Une branche "main" configuré en pull request only (par défaut)
#### Configuration des stages
**Description** :
+ Initialise les packages npm et installe les dépendances
+ Lance les tests unitaires
+ Build l’image Docker du projet à partir du dockerfile et fichier yml
+ Déploiement du conteneur Docker

**Problèmes ou difficultés rencontrés** :
J'ai appris les bonnes pratiques concernant la séparation des stages (définition globale des variables)
#### Test et résultat
![screen3](https://github.com/Devops-Dev-B-2024/projetAntoineRawanGaith/assets/113984329/9bf0c0fe-418c-49e8-8ad9-2a14d10fe6f8)
![screen4](https://github.com/Devops-Dev-B-2024/projetAntoineRawanGaith/assets/113984329/9c5e3cd9-df9a-4a6a-96bf-744e8dd44f76)
### Jenkins (Ghaith)
### Configuration et mise en place de Jenkins CI

**Configuration des jobs Jenkins**

Description : J'ai configuré Jenkins pour automatiser notre processus d'intégration continue de la manière suivante :

1. Création d'un job freestyle pour le build principal.
2. Configuration du dépôt Git : j'ai spécifié l'URL du dépôt et les informations d'identification nécessaires.
3. Définition des déclencheurs de build : les builds sont déclenchés à chaque push sur la branche "development" et via pull request sur "main".
4. Ajout des étapes de build : compilation du code, exécution des tests unitaires, et analyse statique du code avec des outils comme SonarQube.

Problèmes ou difficultés rencontrés : En tant que débutant sur Jenkins, la configuration initiale était assez complexe. Il m'a fallu un certain temps pour comprendre les différents types de jobs et comment les configurer correctement. La documentation et les tutoriels en ligne m'ont beaucoup aidé, mais la prise en main reste un défi pour les novices.

**Sécurisation des builds et déploiement**

Description : J'ai mis en place des mesures de sécurité et des procédures de déploiement pour garantir la qualité et la fiabilité de nos builds :

1. Notifications par email : configuration des notifications pour informer l'équipe des résultats des builds.
2. Déploiement automatique : utilisation de plugins pour déployer automatiquement les builds réussis sur un serveur de staging.
3. Revue par un collaborateur : ajout d'une étape de revue obligatoire avant le déploiement sur l'environnement de production.

Problèmes ou difficultés rencontrés : La configuration des notifications et du déploiement automatique a posé quelques défis, notamment en ce qui concerne les permissions et l'accès aux serveurs. J'ai également dû ajuster les paramètres de sécurité pour s'assurer que seuls les builds approuvés soient déployés en production.

**Test et résultat**

Pour valider les builds et les déploiements, j'ai mis en place une série de tests automatisés et manuels :

1. Exécution de tests unitaires et d'intégration à chaque build.
2. Validation des résultats des tests avant le déploiement.
3. Revue des logs et des rapports de build pour identifier et résoudre les éventuels problèmes.

Dans l'exemple, le workflow a été exécuté avec succès, et nous pouvons voir le détail des différentes étapes (compilation, tests, déploiement) sur le tableau de bord Jenkins.

Ces configurations et procédures assurent un processus d'intégration continue robuste et fiable, facilitant le développement et le déploiement de notre application.


## 3. Analyse comparative
Nous avons fais une analyse comparative de ces 3 outils selon 6 points spécifiques : 
1. Facilité de configuration​
2. Vitesse d’exécution des builds​
3. Efficacité des pipelines de CI​
4. Sécurité​
5. Facilité d’usage​
6. Intégration avec d’autres outils
### 1. Facilité de configuration
**Github** :
+ Configuration simple avec Github Actions​
+ Gestion du workflow via des fichiers YAML​
+ Gestion du workflow intégré à l’interface Github​
+ Documentation complète et facilement accessible

**GitlabCI** :
+ La configuration facile.​
+ Son intégration native simplifie la mise en place d'un pipeline CI.​
+ Utilisation des fichiers .gitlab-ci.yml pour configurer les pipelines directement dans le projet.​
+ La documentation complète et fournit des exemples clairs.​

**Jenkins** :
+ Configuration simple à l'aide de Docker​
+ Interface utilisateur intuitive​
+ Large écosystème de plugins​
+ Documentation complète​
+ Gestion du workflow à l'aide des jenkins pipeline​
### 2. Vitesse d’exécution des builds​
![screen5](https://github.com/Devops-Dev-B-2024/projetAntoineRawanGaith/assets/113984329/c7b8fc40-3a67-4642-bb33-7a1f9537077f)
### 3. Efficacité des pipelines de CI​
**Github** :
+ Conditionnement des workflows par des triggers​
+ Grande personnalisation des workflows et des triggers​
+ Fonctionnalités supplémentaires (documentation) : ​
  + Matrice de stratégie​
  + Cache des dépendances

**GitlabCI** :
+ Gestion efficace des dépendances et des artefacts via des configurations spécifiques dans le fichier .gitlab-ci.yml.​
+ L'efficacité des pipelines contribue positivement au développement continu.​
+ Automatisation robuste et une intégration rapide des changements.

**Jenkins** :
+ Automatisation complète​
+ Rétroaction rapide​
+ Reproductibilité​
+ Flexibilité et extensibilité
### 4. Sécurité​
**Github** :
+ Secrets chiffrés​
+ Sécurisation des branches​
+ Isolation des exécutions de workflow​

**GitlabCI** :
+ Secret Detection​
+ Gestion des permissions au niveau des branches et pipelines​
+ Sécurisation des variables d’environnement​
+ Limitation de l’accès aux ressources sensibles

**Jenkins** :
+ Détection précoce des vulnérabilités​
+ Contrôle d'accès et gestion des autorisations​
+ Intégration de tests de sécurité automatisés
### 5. Facilité d’usage​
**Github** :
+ Visualisateur de workflow​
+ Logs intégrés​
+ Bonne intégration des Github Actions dans l’écosystème Github (interface Web, autres outils)

**GitlabCI** :
+ Facile à prendre en main​
+ Visualisateur de pipelines intuitif​
+ Logs intégrés​
+ Intégration directe avec le dépôt de code et l’interface utilisateur

**Jenkins** :
+ Interface utilisateur intuitive​
+ Modèles et assistants de configuration​
+ Documentation complète et support communautaire
### 6. Intégration avec d’autres outils
**Github** :
+ Intégration de Github Actions avec les autres outils Github​
+ Webhooks pour communiquer les triggers Github​
+ Intégrations préconfigurées avec de nombreux outils externes, accessible facilement dans la marketplace Github Apps

**GitlabCI** :
+ Plugins et API disponibles pour faciliter les intégrations avec d’autres outils de monitoring​
+ Meilleure visibilité et gestion du cycle de développement.

**Jenkins** :
+ Large écosystème de plugins​
+ APIs et Webhooks​
+ Interopérabilité avec les outils DevOps

## Conclusion
Chaque outil présente des avantages distincts, adaptés à des besoins spécifiques. Github Actions se distingue par sa facilité de configuration et son intégration étroite avec l'écosystème Github. GitlabCI offre une solution complète avec une gestion efficace des pipelines et une intégration directe avec le dépôt de code. Jenkins reste un choix flexible et extensible grâce à son riche écosystème de plugins.

Pour une équipe déjà immergée dans l'écosystème Github, Github Actions pourrait être le choix optimal. GitlabCI est idéal pour ceux qui recherchent une intégration continue native et une gestion simplifiée des pipelines. Jenkins est recommandé pour les environnements nécessitant une flexibilité maximale et des intégrations variées.

En conclusion, le choix de l'outil dépendra largement des besoins spécifiques du projet, de l'infrastructure existante, et des préférences de l'équipe en termes de facilité d'usage et de sécurité.
