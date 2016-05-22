import { Component , OnInit} from '@angular/core'
import { Router } from '@angular/router-deprecated';

import { Hero } from '../hero/hero.model'
import { HeroService } from '../hero/hero.service'
import { HeroDetailComponent} from '../hero-detail/hero-detail.component'


@Component({
  selector: 'heroes-list',
  styleUrls: ['app/heroes-list/heroes-list.component.css'],
  templateUrl: 'app/heroes-list/heroes-list.template.html',
  directives: [HeroDetailComponent],
  //providers: [HeroService]
})

export class HeroesListComponent implements OnInit {
  title = 'List of Heroes';
  heroes: Hero[];
  selectedHero: Hero;
  addingHero = false;
  error: any;

  constructor(private _router: Router, 
              private _heroService: HeroService) { }

  getHeroes() {
    this._heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  getHeroesSlowly(){
    // this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
    this._heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  
  onSelect(hero: Hero) { 
    if(this.selectedHero && this.selectedHero.name == hero.name){
      this.selectedHero = { id: -1,
                            name:''}
    }else{
      this.selectedHero = hero; 
    }
  }

  gotoDetail() {
    this._router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
  }

  delete(hero: Hero, event: any) {
    event.stopPropagation();
    this._heroService
        .delete(hero)
        .then(res => {
          this.heroes = this.heroes.filter(h => h !== hero);
          if (this.selectedHero === hero) { this.selectedHero = null; }
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

  addHero() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero) {
    this.addingHero = false;
    if (savedHero) { this.getHeroes(); }
  }


  ngOnInit() {
    this.getHeroesSlowly();
  }
}
