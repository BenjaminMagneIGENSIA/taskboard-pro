# TaskBoardProG2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Commandes utilisés : 
    ng new TaskBoard-Pro-G2 --routing --style=css
    ng g c home
    ng g c about
    ng serve

## Routes fonctionnels : 
    - Home
    - About
via app.component.ts

## Séquence 2 - Logique réactive du flux de données
## Structure du flux
- Le service TaskService utilise un **BehaviorSubject** pour stocker et diffuser la liste des tâches.
- Le composant 'Home s'abonne à ce flux via 'tasks$' et le **pipe async**.
## Mise à jour des données
- La méthode addTask() ajoute une tâche puis appelle next() pour émettre la nouvelle liste.
- La méthode removeTask()* supprime une tâche puis émet à nouveau la liste mise à jour.
- La vue est automatiquement réactualisée sans rechargement.
## Points clés retenus
- Pas besoin d'appeler. getTasks() à chaque fois : la donnée est **vivante**.
- '| async' gère l'abonnement et le désabonnement automatiquement.
- Le flux reste cohérent entre le service et la vue.

- Observable : c'est une source de données asynchrone emettant dans le temps. D'autres composant peuvent s'abonner à cette observable pour suivre ces changements

## Séquence 3 : Lazy Loading :
### • Explication simple de ce que j'ai compris
Le lazy loading permet de charger certaines parties d’une application uniquement quand l’utilisateur en a besoin, plutôt que tout charger dès le début. Cela améliore la vitesse d’ouverture de l’application.
J’ai compris aussi qu’il faut faire attention aux routes : la route du parent et la route de la feature se combinent. Si les chemins ne sont pas alignés (par exemple si on répète le même nom dans le parent et l’enfant), l’URL finale ne correspond plus à ce qu’on tape et la page ne s’affiche pas. C’est souvent là que l’on se trompe.

### • Qu'est-ce que le Lazy Loading
C’est une technique où l’application charge d’abord uniquement le minimum nécessaire pour fonctionner. Les autres pages ou fonctionnalités sont chargées plus tard, au moment de la navigation. Cela réduit le poids initial de l’application et accélère son démarrage.

### • Comment on structure une app avec des features
On organise l’application en plusieurs dossiers appelés “features”.  
Chaque feature correspond à une partie bien définie de l’application (ex : tâches, utilisateurs, administration).  
Chaque feature contient ses composants, ses services et ses routes.  
Grâce à cette organisation, chaque feature peut être chargée à la demande via le lazy loading.
