import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UniversoComponent } from './components/universo/universo.component';
import { GalaxiaComponent } from './components/galaxia/galaxia.component';
import { PlanetaComponent } from './components/planeta/planeta.component';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'universo/:categoria-usuario-id',
    component: UniversoComponent
  },
  {
    path: 'galaxia/:galaxia-id/:categoria-usuario-id',
    component: GalaxiaComponent
  },
  {
    path: 'planeta/:sistema-planetario-id/:categoria-usuario-id',
    component: PlanetaComponent
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
