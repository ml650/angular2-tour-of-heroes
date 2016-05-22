import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { HeroesListComponent} from './heroes-list/heroes-list.component'
import { HeroDetailComponent} from './hero-detail/hero-detail.component'
import { HeroService } from './hero/hero.service'

import { DashboardComponent} from './dashboard/dashboard.component'

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.template.html',
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [HeroService, ROUTER_PROVIDERS]
})

@RouteConfig([
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/heroes',
    name: 'Heroes',
    component: HeroesListComponent
  },
  {
    path: '/detail/:id',
    name: 'HeroDetail',
    component: HeroDetailComponent
   }
])

export class AppComponent { 
  title = "Angular 2 Tutoirial - My Hero"
  desc  = "It's based on Angular 2 tutoiral."
  link  = "https://angular.io/docs/ts/latest/tutorial/"
  note  = "created on 05/21/2016."
}