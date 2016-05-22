import { Injectable } from '@angular/core';
import { Hero } from './hero.model';

// import { HEROES } from './mock-heroes';


import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class HeroService {

  private _heroesUrl = 'app/heroes';  // URL to web api

  constructor(private _http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this._http.get(this._heroesUrl)
               .toPromise()
               .then(response => response.json().data)
               .catch(this.handleError);
  }

  getHero(id: number) {
    return this.getHeroes()
               .then(heroes => heroes.filter(hero => hero.id === id)[0]);
  }

  save(hero: Hero): Promise<Hero>  {
    if (hero.id) {
      return this.put(hero);
    }
    return this.post(hero);
  }

  delete(hero: Hero) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this._heroesUrl}/${hero.id}`;

    return this._http
               .delete(url, headers)
               .toPromise()
               .catch(this.handleError);
  }

  // Add new Hero
  private post(hero: Hero): Promise<Hero> {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this._http
               .post(this._heroesUrl, JSON.stringify(hero), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  // Update existing Hero
  private put(hero: Hero) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this._heroesUrl}/${hero.id}`;

    return this._http
               .put(url, JSON.stringify(hero), {headers: headers})
               .toPromise()
               .then(() => hero)
               .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  // getHero(id: number) {
  //   return Promise.resolve(HEROES).then(
  //     heroes => heroes.filter(hero => hero.id === id)[0]
  //   );
  // }
  

  // // before adding in-memory-data.service.ts
  // // getHeroes() {
  // //   return Promise.resolve(HEROES);
  // // }
  // //after
  // getHeroes() {
  //   return Promise.resolve(HEROES);
  // }

  // //HTTP reqest
  // getHeroes(): Promise<Hero[]> {
  //   return this.http.get(this.heroesUrl)
  //              .toPromise()
  //              .then(response => response.json().data)
  //              .catch(this.handleError);
  // }

  // // See the "Take it slow" appendix
  // getHeroesSlowly() {
  //   return new Promise<Hero[]>(resolve =>
  //     setTimeout(()=>resolve(HEROES), 2000) // 2 seconds
  //   );
  // }

}