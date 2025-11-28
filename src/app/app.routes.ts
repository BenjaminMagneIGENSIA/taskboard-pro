import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,       // route d’accueil
  },
  {
    path: 'about',
    component: AboutComponent,      // page "À propos"
  },
  {
    path: 'tasks',
    loadChildren: () => import('./features/tasks/tasks-page/route').then(m => m.TASKS_ROUTES),
  },

];