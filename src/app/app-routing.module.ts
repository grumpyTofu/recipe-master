import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipeComponent } from './recipe/recipe.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'recipe/:id', component: RecipeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
