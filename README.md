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

## Commandes utilisees
- `ng new TaskBoard-Pro-G2 --routing --style=css`
- `ng g c home`
- `ng g c about`
- `ng serve`

## Routes fonctionnelles
- Home
- About
via `app.component.ts`

## Sequence 2 - Logique reactive du flux de donnees
### Structure du flux
- Le service TaskService utilise un **BehaviorSubject** pour stocker et diffuser la liste des taches.
- Le composant Home s'abonne a ce flux via `tasks$` et le **pipe async**.
### Mise a jour des donnees
- La methode `addTask()` ajoute une tache puis appelle `next()` pour emettre la nouvelle liste.
- La methode `deleteTask()` supprime une tache puis emet la liste mise a jour.
- La vue est automatiquement actualisee sans rechargement.
### Points clefs
- Pas besoin d'appeler `getTasks()` a chaque fois : la donnee est **vivante**.
- `| async` gere l'abonnement et le desabonnement automatiquement.
- Le flux reste coherent entre le service et la vue.
- Un Observable est une source de donnees asynchrone emettant dans le temps; d'autres composants peuvent s'y abonner pour suivre ces changements.

## Sequence 3 - Lazy Loading & Composants dynamiques
- **Qu'est-ce que le Lazy Loading ?** C'est le fait de charger une page ou une feature uniquement quand l'utilisateur en a besoin. On allege ainsi le bundle initial et l'ouverture de l'app est plus rapide.
- **Organisation avec `features/`** : chaque partie metier (taches, about...) vit dans son propre dossier avec son composant, son service et ses routes. On declare ensuite la route parent qui fait un `loadChildren` ou `loadComponent` pour charger la feature a la demande.
- **Qu'est-ce qu'un composant dynamique ?** Au lieu d'etre ecrit directement dans le template, il est cree au runtime par le code (ex: pour afficher temporairement un bloc de mise en avant).
- **Comment fonctionne `ViewContainerRef` + `createComponent()` ?** On place un ancrage dans le template (`#highlightContainer`). Dans le code, on recupere ce container, on l'efface avec `clear()` si besoin puis on appelle `createComponent()` pour injecter le composant voulu et lui passer ses inputs. Rien n'est charge tant que le bouton n'est pas clique, ce qui garde l'UI legere et flexible.
