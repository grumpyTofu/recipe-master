import { LoadingService } from './loading.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { RecipeResults, Recipe } from './recipe';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipesUrl = `${this.env.apiUrl}/list?tags=under_30_minutes&from=0&sizes=20`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-rapidapi-host': this.env.apiHost,
      'x-rapidapi-key': this.env.apiKey
    })
  };

  private recipeUrl = `${this.env.apiUrl}/detail`;

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private env: EnvService
    ) {
      if (env.enableDebug) {
        console.log('Debug mode enabled!');
      }
    }

  /** GET RecipeResultss from the api */
  getRecipeResults(): Observable<RecipeResults> {
    this.loadingService.startLoading();
    return this.http.get<RecipeResults>(this.recipesUrl, this.httpOptions)
      .pipe(
        tap(_ => this.loadingService.stopLoading()),
        catchError(this.handleError<RecipeResults>('getRecipeResults'))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getRecipe(id: number): Observable<Recipe> {
    this.loadingService.startLoading();
    const url = `${this.recipeUrl}?id=${id}`;
    return this.http.get<Recipe>(url, this.httpOptions).pipe(
      tap(_ => this.loadingService.stopLoading()),
      catchError(this.handleError<Recipe>(`getRecipe id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
