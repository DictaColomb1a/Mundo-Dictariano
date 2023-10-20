import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UniversoComponent } from './components/universo/universo.component';
import { GalaxiaComponent } from './components/galaxia/galaxia.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'universo',
    component: UniversoComponent
  },
  {
    path: 'galaxia/:galaxia-id',
    component: GalaxiaComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
