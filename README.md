# TaskBoardProG2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Performance (Lighthouse)
- `npm run start:prod` : lance le serveur avec la configuration production pour des mesures realistes.
- `npm run build:prod` : build production (minification + optimisations Angular).

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

## Sequence 4 - Tests Unitaires Angular

### Ce que j'ai appris

#### 1. Pourquoi tester ?
- Les tests permettent de verrouiller le comportement attendu et de detecter les regressions avant la mise en prod.
- Sans tests, le risque est de casser une fonctionnalite en silence et de l'apprendre uniquement via les utilisateurs.
- Exemple concret : apres avoir refactore `addTask`, un test a revele que je n'injectais plus l'id genere et la liste restait incoherente.

#### 2. Outils utilises
- **Jasmine** : langage de specs qui fournit `describe`, `it` et les matchers pour exprimer l'intention des tests.
- **Karma** : runner qui lance les tests dans un navigateur et produit les rapports en continu.
- **TestBed** : banc d'essai Angular pour declarer modules/composants/services et injecter des dependances comme en runtime.

#### 3. Concepts cles maitrises
- **AAA Pattern** : Arrange les pre-conditions, Act en declenchant l'action, Assert en verifiant le resultat attendu.
- **Mocks** : objets factices qui remplacent une dependance pour controler les retours et isoler le test.
- **Spies** : observateurs sur une methode pour verifier qu'elle est appelee avec les bons arguments ou simuler son retour.
- **Fixture et detectChanges()** : la fixture pilote le composant teste; `detectChanges()` declenche le cycle de detection pour synchroniser le template avec l'etat.

#### 4. Types de tests pratiques
- Test d'une classe simple (sans Angular)
- Test d'un service
- Test d'un composant avec TestBed
- Test des @Input
- Test des @Output
- Test du DOM

#### 5. Erreurs courantes rencontre
- Oublier `detectChanges()` : le DOM reste sur l'ancien etat et les assertions sur le template echouent.
- `No provider for...` : ajouter la dependance dans `providers` ou importer le module adequat dans TestBed.
- Tests qui dependent les uns des autres : remettre a zero l'etat dans `beforeEach`, ne pas re-utiliser la meme instance de service entre specs.

#### 6. Commandes importantes
- ng test : lancer les tests
- ng test --code-coverage : lancer avec rapport de couverture

#### 7. Code Coverage atteint
- Objectif : 70-80%
- Mon resultat : 78% sur TaskBoard Pro (mesure locale la plus recente)

#### 8. Difficultes rencontrees et solutions
| Difficulte | Solution trouvee |
|------------|------------------|
| async/await qui bloque le test | Utiliser `fakeAsync` et `tick` pour maitriser le temps virtuel et les timers |
| Mock de service trop rigide | Remplacer par un spy Jasmine et definir `returnValue` ou `callFake` selon le scenario |
| Tests flakys sur le DOM | Toujours appeler `detectChanges()` apres chaque modification de donnee et attendre les Promises avec `whenStable()` |

#### 9. Points a approfondir
- Tests d'integration
- Tests E2E avec Cypress
- Mocking avance pour HttpClient
- Tests de services asynchrones

### Projet : Tests TaskBoard Pro

#### Tests implementes
- TaskService : addTask(), deleteTask(), getTasks()
- TaskHighlight Component : affichage du titre, @Input title, rendu dans le DOM

#### Resultats
- Tests reussis : 14 / 14 (derniere execution locale)
- Code coverage : 78%
- Temps d'execution : environ 9 secondes

#### Résultats LightHouse :
- Accessibility : 100
- Performance : 57
- SEO : 90
- Best practices : 100

### Reflexion personnelle
Cette sequence m'a appris a formaliser mes attentes avant d'ecrire du code et a m'appuyer sur les tests pour refactorer sans crainte. La partie la plus utile a ete l'usage de TestBed pour reproduire l'environnement Angular et comprendre comment injecter les dependances. Je compte continuer a ecrire des tests systematiquement pour chaque nouvelle fonctionnalite et viser une couverture stable au-dessus de 75%.

### Ressources consultees
- Angular Testing Guide (https://angular.io/guide/testing)
- Jasmine Documentation (https://jasmine.github.io/)
- Notes de cours - Sequence 5
