import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { Observable, of } from 'rxjs';

import { Recipe } from './../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {

  recipes: Recipe[];

  cards: Observable<any[]>;

  constructor(
    private recipeService: RecipeService,
    private breakpointObserver: BreakpointObserver
  ) { }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {
    this.getRecipes();
  }

  getRecipes(): void {
    this.recipeService.getRecipeResults()
    .subscribe(data => {
      this.recipes = data.results;
      /** Based on the screen size, switch from standard to one column per row */
      this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(({ matches }) => {
          let cards = [];
          data.results.map((recipe, index) => {
            const card = {
              id: recipe.id,
              title: recipe.name,
              description: recipe.description,
              image: recipe.thumbnail_url,
              ratings: recipe.user_ratings ? {
                likes: recipe.user_ratings.count_positive ? recipe.user_ratings.count_positive : 0,
                dislikes: recipe.user_ratings.count_positive ? recipe.user_ratings.count_negative : 0,
                score: recipe.user_ratings.score ? recipe.user_ratings.score : 0
              } : { likes: 0, dislikes: 0, score: 0},
              cols: !matches && index / 4 === 1 ? 2 : 1,
              rows: !matches && index / 3 === 1 ? 2 : 1
            };
            cards.push(card);
          });
          return cards;
        })
      );
    });
  }
}
